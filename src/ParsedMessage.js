import _ from 'lodash';

export const COMMANDS = {
    PING: 'ping',
    ERROR: 'error',
    NOTICE: 'notice',
    PRIVMSG: 'privmsg',
    WHISPER: 'whisper'
};

const TARGET_TYPE = {
    CHANNEL: 'channel',
    USER: 'user'
}

const MESSAGE_REGEX = /^@(.*?\s)?:(.*?\s)(.*?\s)(.*?\s):(.*?)\r?\n?$/;
const COMMAND_EXTRACT_REGEX = /^!(.*?)\s(.*)\r?\n?$|^!(.*)/;

export default class ParsedMessage {
    constructor(rawMessage) {
        this.parse(rawMessage);
    }

    parse(rawMessage) {
        if (_.startsWith(rawMessage, '@')) {
            var resultArray = MESSAGE_REGEX.exec(rawMessage);
            if (resultArray != null) {
                this.parseTags(resultArray[1]);
                this.parseUser(resultArray[2]);
                this.parseCommand(resultArray[3]);
                this.parseTarget(resultArray[4]);
                this.parseMessage(resultArray[5]);
            }
        } else if (_.startsWith(rawMessage, 'PING')) {
            this.command = COMMANDS.PING;
            this.message = rawMessage.split(/:(.+)/)[1];
        } else if (_.startsWith(rawMessage, 'ERROR')) {
            this.command = COMMANDS.ERROR;
            this.message = rawMessage.split(/:(.+)/)[1];
        } else if (_.startsWith(rawMessage, 'NOTICE')) {
            this.command = COMMANDS.NOTICE;
            this.message = rawMessage.split(/:(.+)/)[1];
        }
    }

    parseTags(tagsString) {
        this.tags = {};
        if (tagsString !== undefined) {
            var splitTags = tagsString.split(';');
            _.forEach(splitTags, item => {
                var splitTag = item.split('=');
                var tagName = splitTag[0];
                var tagValue;
                if (splitTag[1] !== undefined) {
                    var splitTagValues = splitTag[1].split(',');
                    if (splitTagValues.length === 1) {
                        tagValue = splitTagValues[0];
                    } else {
                        tagValue = splitTagValues;
                    }
                }
                this.tags[tagName] = tagValue;
            });
        }
    }

    parseUser(userString) {
        this.sender = undefined;
        if (userString !== undefined) {
            var splitUser = userString.split('!');
            this.sender = splitUser[0];
        }
    }

    parseCommand(commandString) {
        switch(commandString.trim()) {
            case 'PRIVMSG':
                this.command = COMMANDS.PRIVMSG;
                break;
            case 'WHISPER':
                this.command = COMMANDS.WHISPER;
                break;
        }
    }

    parseTarget(targetString) {
        this.target = undefined;
        this.targetType = undefined;
        if (targetString !== undefined) {
            if (_.startsWith(targetString, '#')) {
                this.target = targetString;//.substring(1);
                this.targetType = TARGET_TYPE.CHANNEL;
            } else {
                this.target = targetString;
                this.targetType = TARGET_TYPE.USER;
            }
        }
    }

    parseMessage(messageString) {
        if (_.startsWith(messageString, '!')) {
            var parsedCommand = COMMAND_EXTRACT_REGEX.exec(messageString); 
            if (parsedCommand != null) {
                this.userCommand = {};
                this.userCommand.name = parsedCommand[1] === undefined ? parsedCommand[3] : parsedCommand[1];
                this.userCommand.params = parsedCommand[2];
            }
        }
        this.message = messageString;
    }
}