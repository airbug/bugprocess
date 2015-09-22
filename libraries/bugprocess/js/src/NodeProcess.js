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

//@Export('bugprocess.NodeProcess')

//@Require('Class')
//@Require('Event')
//@Require('EventDispatcher')
//@Require('Throwables')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {


    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class               = bugpack.require('Class');
    var Event               = bugpack.require('Event');
    var EventDispatcher     = bugpack.require('EventDispatcher');
    var Throwables          = bugpack.require('Throwables');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {EventDispatcher}
     */
    var Process = Class.extend(EventDispatcher, {

        _name: "bugprocess.Process",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {Object} childProcess
         */
        _constructor: function(childProcess) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {Object}
             */
            this.childProcess       = childProcess;

            /**
             * @private
             * @type {boolean}
             */
            this.closed             = false;

            /**
             * @private
             * @type {number}
             */
            this.exitCode           = null;

            /**
             * @private
             * @type {string}
             */
            this.exitSignal         = null;

            /**
             * @private
             * @type {boolean}
             */
            this.exited             = false;

            var _this = this;
            this.hearChildProcessClose      = function(code, signal) {
                _this.handleChildProcessClose(code, signal);
            };
            this.hearChildProcessError      = function(error) {
                _this.handleChildProcessError(error);
            };
            this.hearChildProcessExit       = function(code, signal) {
                _this.handleChildProcessExit(code, signal);
            };
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {Object}
         */
        getChildProcess: function() {
            return this.childProcess;
        },

        /**
         * @return {boolean}
         */
        getClosed: function() {
            return this.closed;
        },

        /**
         * @return {number}
         */
        getExitCode: function() {
            return this.exitCode;
        },

        /**
         * @return {string}
         */
        getExitSignal: function() {
            return this.exitSignal;
        },

        /**
         * @return {boolean}
         */
        getExited: function() {
            return this.exited;
        },


        //-------------------------------------------------------------------------------
        // Convenience Methods
        //-------------------------------------------------------------------------------

        /**
         * @return {Object}
         */
        getErrorStream: function() {
            if (this.childProcess) {
                return this.childProcess.stderr;
            } else {
                return null;
            }
        },

        /**
         * @return {Object}
         */
        getInputStream: function() {
            if (this.childProcess) {
                return this.childProcess.stdin;
            } else {
                return null;
            }
        },

        /**
         * @return {Object}
         */
        getOutputStream: function() {
            if (this.childProcess) {
                return this.childProcess.stdout;
            } else {
                return null;
            }
        },

        /**
         * @return {number}
         */
        getProcessId: function() {
            return this.childProcess.pid;
        },

        /**
         * @return {boolean}
         */
        isClosed: function() {
            return this.closed;
        },

        /**
         * @return {boolean}
         */
        isExited: function() {
            return this.exited;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {string} signal
         */
        destroyProcess: function(signal) {
            if (!this.isExited()) {
                this.childProcess.kill(signal);
            }
        },


        //-------------------------------------------------------------------------------
        // Protected Methods
        //-------------------------------------------------------------------------------

        /**
         * @protected
         */
        cleanupProcess: function() {
            if (this.childProcess) {
                this.childProcess.removeListener('close', this.hearChildProcessClose);
                this.childProcess.removeListener('error', this.hearChildProcessError);
                this.childProcess.removeListener('exit', this.hearChildProcessExit);
                this.childProcess = null;
            }
        },

        /**
         * @private
         * @param {number} code
         * @param {string} signal
         */
        dispatchClose: function(code, signal) {
            this.dispatchEvent(new Event(Process.EventTypes.CLOSE, {
                code: code,
                signal: signal
            }));
        },

        /**
         * @private
         * @param {Error} error
         */
        dispatchError: function(error) {
            this.dispatchEvent(new Event(Process.EventTypes.ERROR, {
                error: error
            }));
        },

        /**
         * @private
         * @param {number} code
         * @param {string} signal
         */
        dispatchExit: function(code, signal) {
            this.dispatchEvent(new Event(Process.EventTypes.EXIT, {
                code: code,
                signal: signal
            }));
        },


        //-------------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @param {number} code
         * @param {string} signal
         */
        handleChildProcessClose: function(code, signal) {
            this.cleanupProcess();
            this.closed = true;
            this.dispatchClose(code, signal);
        },

        /**
         * @private
         * @param {Error} error
         */
        handleChildProcessError: function(error) {
            this.dispatchError(error);
        },

        /**
         * @private
         * @param {number} code
         * @param {string} signal
         */
        handleChildProcessExit: function(code, signal) {
            this.exited = true;
            this.exitCode = code;
            this.exitSignal = signal;
            this.dispatchExit(code, signal);
        }
    });


    //-------------------------------------------------------------------------------
    // Static Properties
    //-------------------------------------------------------------------------------

    /**
     * @static
     * @enum {string}
     */
    Process.EventTypes = {
        CLOSE: "Process:Close",
        ERROR: "Process:Error",
        EXIT: "Process:Exit"
    };


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugprocess.Process', Process);
});
