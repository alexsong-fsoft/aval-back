'use strict'

const _ = require('lodash');


class AuthenticationException {
    constructor(message, errorData) {
      this.code = 401;
      this.success = false;
      this.message = message || "";
      this.errorData = errorData;
    }
  }
  
  class ForbiddenException {
    constructor(message) {
      this.code = 403;
      this.success = false;
      this.message = message;
    }
  }
  
  class HttpException {
    constructor(code, message, errorData) {
      this.code = code;
      this.success = false;
      this.message = message || "";
      this.errorData = errorData;
    }
  }
  
  class ValidateException {
    constructor(message, errorData) {
      errorData = errorData ? errorData : [];
      this.code = 400;
      this.success = false;
      this.errorData = errorData;
      this.message = message || "";
    }
  }
  
  class DBException {
    constructor(message, errorData) {
      this.code = 500;
      this.success = false;
      this.message = message || "";
      this.errorData = errorData || [];
    }
  }
  
  class ValidateSchemaException {
    constructor(errorData) {
      this.code = 400;
      this.success = false;
      //this.message = cMensaje.mensajes.error.errorValidacion;
      this.errorData = errorData || [];
    }
  }
  
  class CustomException {
    constructor(message, errorData) {
      this.code = 500;
      this.success = false;
      this.message = message || "";
      this.errorData = errorData || [];
    }
  }
  

  module.exports = {
    AuthenticationException,
    ForbiddenException,
    HttpException,
    ValidateException,
    DBException,
    ValidateSchemaException,
    CustomException,
}