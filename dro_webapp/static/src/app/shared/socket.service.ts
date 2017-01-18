/*import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

@Injectable()
export class SocketService {
    private name: string;
    private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    socket: SocketIOClient.Socket;

    constructor() {
        console.log('SocketService created')
    }

    // Get items observable
    get(name: string): SocketService {
        this.name = name;
        let socketUrl = this.host + "/" + this.name;
        console.log("connecting to: " + socketUrl);
        this.socket = io.connect(socketUrl);
        console.log("connected");
        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });
        
        return this;
    }

    // Create signal
    create(name: string) {
        this.socket.emit("create", name);
    }

    // Remove signal
    remove(name: string) {
        this.socket.emit("remove", name);
    }

    // Handle connection opening
    private connect() {
        console.log(`Connected to "${this.name}"`);

        // Request initial list when connected
        this.socket.emit("my event", "test");
        console.log(`msg sent`);
    }

    // Handle connection closing
    private disconnect() {
        console.log(`Disconnected from "${this.name}"`);
    }
}
*/