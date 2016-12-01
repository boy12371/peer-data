/**
 * This file is part of the peer-data package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {ConsoleLogger} from "./console-logger";
import {SocketChannel} from "./socket-channel";
import {DefaultConnection} from "./default-connection";
import {Logger} from "./logger/logger";
import {Signaling} from "./signaling/signaling";
import {Connection} from "./connection/connection";
import {LogLevel} from "./logger/log-level";

export class Config {
    private _servers: RTCConfiguration;
    private _dataConstraints?: RTCDataChannelInit = null;
    private _logger: Logger;
    private _signalling: Signaling;
    private _connection: Connection;

    constructor(servers: RTCConfiguration = {},
                constraints: RTCDataChannelInit = null,
                logLevel: LogLevel | Logger = LogLevel.ERROR,
                signalling?: Signaling) {
        this._servers = servers;
        this._dataConstraints = constraints;
        this._signalling = signalling ? signalling : new SocketChannel();
        this._logger = this.isLogger(logLevel) ? logLevel : new ConsoleLogger(logLevel);
        this._connection = new DefaultConnection();
    }

    private isLogger(logger: any): logger is Logger {
        return 'logLevel' in logger;
    }

    get servers(): RTCConfiguration {
        return this._servers;
    }

    set servers(value: RTCConfiguration) {
        this._servers = value;
    }

    get logger(): Logger {
        return this._logger;
    }

    set logger(value: Logger) {
        this._logger = value;
    }

    get signalling(): Signaling {
        return this._signalling;
    }

    set signalling(value: Signaling) {
        this._signalling = value;
    }

    get connection(): Connection {
        return this._connection;
    }

    set connection(value: Connection) {
        this._connection = value;
    }

    get dataConstraints(): RTCDataChannelInit {
        return this._dataConstraints;
    }

    set dataConstraints(value: RTCDataChannelInit) {
        this._dataConstraints = value;
    }
}
