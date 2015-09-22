/*
 * Copyright (c) 2015 airbug Inc. All rights reserved.
 *
 * All software, both binary and source contained in this work is the exclusive property
 * of airbug Inc. Modification, decompilation, disassembly, or any other means of discovering
 * the source code of this software is prohibited. This work is protected under the United
 * States copyright law and other international copyright treaties and conventions.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugprocess.ProcessBuilder')

//@Require('Class')
//@Require('Obj')
//@Require('Throwables')
//@Require('TypeUtil')
//@Require('bugprocess.Process')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // Common Modules
    //-------------------------------------------------------------------------------

    var child_process       = require('child_process');


    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class               = bugpack.require('Class');
    var Obj                 = bugpack.require('Obj');
    var Throwables          = bugpack.require('Throwables');
    var TypeUtil            = bugpack.require('TypeUtil');
    var Process             = bugpack.require('bugprocess.Process');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var ProcessBuilder = Class.extend(Obj, {

        _name: "bugprocess.ProcessBuilder",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {{
         *      args: Array.<string>,
         *      command: string,
         *      options: {
         *          cwd: string,
         *          detached: boolean,
         *          env: Object,
         *          gid: number,
         *          stdio: (Array.<string> | string),
         *          uid: number
         *      }
         * }} processOptions
         */
        _constructor: function(processOptions) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {Array.<string>}
             */
            this.processArgs        = [];

            /**
             * @private
             * @type {string}
             */
            this.processCommand     = "";

            /**
             * @private
             * @type {{
             *     cwd: string,
             *     detached: boolean,
             *     env: Object,
             *     gid: number,
             *     stdio: (Array.<string> | string),
             *     uid: number
             * }}
             */
            this.processOptions     = {};
        },


        //-------------------------------------------------------------------------------
        // Init Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {{
         *      args: Array.<string>,
         *      command: string,
         *      options: {
         *          cwd: string,
         *          detached: boolean,
         *          env: Object,
         *          gid: number,
         *          stdio: (Array | string),
         *          uid: number
         *      }
         * }} processOptions
         */
        init: function(processOptions) {

            this._super();

            if (TypeUtil.isObject(processOptions)) {
                if (TypeUtil.isArray(processOptions.args)) {
                    this.args(processOptions.args);
                }
                if (TypeUtil.isString(processOptions.command)) {
                    this.command(processOptions.command);
                }
                if (TypeUtil.isObject(processOptions.options)) {
                    this.options(processOptions.options);
                }
            }
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {Array.<string>}
         */
        getProcessArgs: function() {
            return this.processArgs;
        },

        /**
         * @return {string}
         */
        getProcessCommand: function() {
            return this.processCommand;
        },

        /**
         * @return {{
         *      cwd: string,
         *      detached: boolean,
         *      env: Object,
         *      gid: number,
         *      stdio: (Array.<string>|string),
         *      uid: number
         * }}
         */
        getProcessOptions: function() {
            return this.processOptions;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {Array.<string>} processArgs
         * @return {ProcessBuilder}
         */
        args: function(processArgs) {
            if (TypeUtil.isArray(processArgs)) {
                this.processArgs = processArgs;
                return this;
            } else {
                throw Throwables.illegalArgumentBug("processArgs", processArgs, "args must be an Array of strings");
            }
        },

        /**
         * @param {string} processCommand
         * @return {ProcessBuilder}
         */
        command: function(processCommand) {
            if (TypeUtil.isString(processCommand)) {
                this.processCommand = processCommand;
                return this;
            } else {
                throw Throwables.illegalArgumentBug("processCommand", processCommand, "command must be a string");
            }
        },

        /**
         * @param {string} processCwd
         * @return {ProcessBuilder}
         */
        cwd: function(processCwd) {
            if (TypeUtil.isString(processCwd)) {
                this.processOptions.cwd = processCwd;
                return this;
            } else {
                throw Throwables.illegalArgumentBug("processCwd", processCwd, "cwd must be a string");
            }
        },

        /**
         * @param {boolean} processDetached
         * @return {ProcessBuilder}
         */
        detached: function(processDetached) {
            if (TypeUtil.isBoolean(processDetached)) {
                this.processOptions.detached = processDetached;
                return this;
            } else {
                throw Throwables.illegalArgumentBug("processDetached", processDetached, "detached must be a boolean");
            }
        },

        /**
         * @param {Object} processEnv
         * @return {ProcessBuilder}
         */
        env: function(processEnv) {
            if (TypeUtil.isObject(processEnv)) {
                this.processOptions.env = processEnv;
                return this;
            } else {
                throw Throwables.illegalArgumentBug("processEnv", processEnv, "env must be an Object");
            }
        },

        /**
         * @param {number} processGid
         * @return {ProcessBuilder}
         */
        gid: function(processGid) {
            if (TypeUtil.isNumber(processGid)) {
                this.processOptions.gid = processGid;
                return this;
            } else {
                throw Throwables.illegalArgumentBug("processGid", processGid, "gid must be a number");
            }
        },

        /**
         * @param {{
         *      cwd: string,
         *      detached: boolean,
         *      env: Object,
         *      gid: number,
         *      stdio: (Array.<string>|string),
         *      uid: number
         * }} processOptions
         * @return {ProcessBuilder}
         */
        options: function(processOptions) {
            if (TypeUtil.isObject(processOptions)) {
                if (TypeUtil.isString(processOptions.cwd)) {
                    this.cwd(processOptions.cwd);
                }
                if (TypeUtil.isBoolean(processOptions.detached)) {
                    this.detached(processOptions.detached);
                }
                if (TypeUtil.isObject(processOptions.env)) {
                    this.env(processOptions.env);
                }
                if (TypeUtil.isNumber(processOptions.gid)) {
                    this.gid(processOptions.gid);
                }
                if (TypeUtil.isString(processOptions.stdio) || TypeUtil.isArray(processOptions.stdio)) {
                    this.stdio(processOptions.stdio);
                }
                if (TypeUtil.isNumber(processOptions.uid)) {
                    this.uid(processOptions.uid);
                }
            } else {
                throw Throwables.illegalArgumentBug("processOptions", processOptions, "options must be an object");
            }
        },

        /**
         * @return {Process}
         */
        start: function() {
            var childProcess = child_process.spawn(this.processCommand, this.processArgs, this.processOptions);
            return new Process(childProcess);
        },

        /**
         * @param {(Array.<string>|string)} processStdio
         * @return {ProcessBuilder}
         */
        stdio: function(processStdio) {
            if (TypeUtil.isArray(processStdio) || TypeUtil.isString(processStdio)) {
                this.processOptions.stdio = processStdio;
                return this;
            } else {
                throw Throwables.illegalArgumentBug("processStdio", processStdio, "stdio must be a string or an Array of strings");
            }
        },

        /**
         * @param {number} processUid
         * @return {ProcessBuilder}
         */
        uid: function(processUid) {
            if (TypeUtil.isNumber(processUid)) {
                this.processOptions.uid = processUid;
                return this;
            } else {
                throw Throwables.illegalArgumentBug("processUid", processUid, "uid must be a number");
            }
        }
    });



    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugprocess.ProcessBuilder', ProcessBuilder);
});
