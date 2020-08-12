const config = require("../utils/config");
const videoToken = require("../utils/tokens");

let Room = require("../models/room");

var rooms = {};
var hosts = {};

module.exports = function (io, socket) {
  // TODO: How to use a single instance of Socket.IO in your React app
  // https://itnext.io/how-to-use-a-single-instance-of-socket-io-in-your-react-app-6a4465dcb398
  console.log("We have a new connection.");

  socket.on("availability input", ({ available, room }) => {
    // Listen to hosts availability info and send to clients
    return io.emit("availability output", { available, room });
  });

  socket.on("join room", ({ room }) => {
    // When a host connects, joins a room
    socket.join(room);
    if (room in rooms) {
      // This room created previously
      console.log("This room created previously");
      let host = rooms[room]["host"];
      io.sockets.connected[host].disconnect();
    }
    rooms[room] = {};
    rooms[room]["clients"] = [];
    rooms[room]["host"] = socket.id;
    hosts[socket.id] = room;
    console.log(`Room: ${room} established`);
  });

  socket.on("meeting request", ({ subject }) => {
    // Meeting request comes from a client and attach to hosts randomly
    console.log(
      `Socket: ${socket.id} has a meeting request with subject: ${subject}`
    );
    Room.find({ available: true }).then((res) => {
      const room = res[Math.floor(Math.random() * res.length)]; // Find the room from availables randomly
      const room_name = room.room_name;
      socket.join(room_name); // Client joined socket room
      socket.to(room_name).emit("host meeting request", {
        name: socket.id,
        socket: socket.id,
        subject,
      }); // Sent connection request to host, NOT SENDER
      rooms[room_name]["clients"].push(socket.id); // Client added to rooms object
      console.log(`${socket.id} joined ${room_name}`);
    });
  });

  socket.on(
    "request accepted",
    ({ guest_socket, room, guest_name, host_name }) => {
      // As host accept one of the request, reject the rests
      rooms[room]["clients"].forEach((client) => {
        client !== guest_socket && io.to(client).emit("request denied message");
      });

      rooms[room]["clients"] = rooms[room]["clients"].filter(
        (val) => val === guest_socket
      );

      io.sockets.connected[guest_socket].join(room);
      // When a conversation starts, make host busy
      io.emit("availability output", { available: false, room });
      Room.findOneAndUpdate(
        { room_name: room },
        { $set: { available: false } }
      );

      // Create host and guest tokens
      let token_guest = videoToken(guest_name, room, config);
      let token_host = videoToken(host_name, room, config);
      token_guest = token_guest.toJwt();
      token_host = token_host.toJwt();

      // Send tokens to host and client
      socket.emit("receive token", token_host); // Send token to host
      io.to(guest_socket).emit("receive token", {
        token: token_guest,
        room: room,
      }); // Send to accepted client
    }
  );

  socket.on("request denied", ({ socket, room }) => {
    // As host rejects a request, inform the client
    io.to(socket).emit("request denied message");
    rooms[room]["clients"] = rooms[room]["clients"].filter(
      (val) => val !== socket
    );
  });

  socket.on("fill-form", ({ form, room }) => {
    socket.to(room).emit("filling-form", form);
  });

  socket.on("disconnect", () => {
    // As host disconnects, remove from hosts MAP, emit to everybody, and change DB
    let host_disconnected = false;
    Object.keys(hosts).forEach(async (host) => {
      if (socket.id === host) {
        host_disconnected = true;
        const room = hosts[socket.id];
        delete hosts[socket.id];
        io.emit("availability output", { available: false, room });
        // If guest requested and host disconnects reject the guest
        rooms[room]["clients"].forEach((client) => {
          io.to(client).emit("request denied message");
        });
        delete rooms[room];
        await Room.findOneAndUpdate(
          { room_name: room },
          { $set: { available: false } }
        );
        // ).then(res => console.log(res));
        console.log("Host disconnected!");
      }
    });
    // As client disconnects, remove its request (if any) from hosts
    if (!host_disconnected) {
      Object.keys(hosts).forEach((host) => {
        io.to(host).emit("client disconnected", socket.id); // Send to host
      });
      console.log("Client disconnected");
    }
  });
};
