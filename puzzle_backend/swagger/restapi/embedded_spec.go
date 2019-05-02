// Code generated by go-swagger; DO NOT EDIT.

package restapi

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"encoding/json"
)

var (
	// SwaggerJSON embedded version of the swagger document used at generation time
	SwaggerJSON json.RawMessage
	// FlatSwaggerJSON embedded flattened version of the swagger document used at generation time
	FlatSwaggerJSON json.RawMessage
)

func init() {
	SwaggerJSON = json.RawMessage([]byte(`{
  "schemes": [
    "https"
  ],
  "swagger": "2.0",
  "info": {
    "description": "Harmony Puzzle is a simple yet addictive blockchain-based puzzle game.\n",
    "title": "Harmony Puzzle",
    "version": "0.0.1"
  },
  "host": "harmony-puzzle-ek.appspot.com",
  "basePath": "/v1",
  "paths": {
    "/finish": {
      "post": {
        "consumes": [
          "application/json"
        ],
        "summary": "FE calls this to post a level",
        "operationId": "postFinish",
        "parameters": [
          {
            "type": "string",
            "description": "user's account private key, hex-encoded",
            "name": "accountKey",
            "in": "query",
            "required": true
          },
          {
            "type": "integer",
            "description": "level number (1-based)",
            "name": "level",
            "in": "query",
            "required": true
          },
          {
            "type": "integer",
            "description": "the solution's height (the same number found in all squares)",
            "name": "height",
            "in": "query"
          },
          {
            "type": "string",
            "description": "user's moves from first to last; [udlr]* in regex",
            "name": "sequence",
            "in": "query",
            "required": true
          },
          {
            "type": "integer",
            "description": "where the cursor was after completing the last move in sequence, in telephone keypad notation (1-9)",
            "name": "last_pos",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "The level has been accepted.",
            "schema": {
              "type": "object",
              "properties": {
                "reward": {
                  "description": "reward amount, in wei (divide by 10^18 to get HRX)",
                  "type": "number"
                }
              }
            }
          },
          "503": {
            "description": "Firebase DB error.",
            "schema": {
              "type": "object",
              "properties": {
                "msg": {
                  "type": "string"
                }
              }
            }
          },
          "504": {
            "description": "Blockchain RPC call failed.",
            "schema": {
              "type": "object",
              "properties": {
                "msg": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/play": {
      "post": {
        "consumes": [
          "application/json"
        ],
        "summary": "FE calls this to start a new game.",
        "operationId": "postPlay",
        "parameters": [
          {
            "type": "string",
            "description": "user's account private key, hex-encoded",
            "name": "accountKey",
            "in": "query",
            "required": true
          },
          {
            "type": "number",
            "description": "user's bet, in wei (divide by 10^18 to get HRX)",
            "name": "stake",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "201": {
            "description": "A new game has been started."
          },
          "403": {
            "description": "The request was denied.",
            "schema": {
              "type": "object",
              "required": [
                "errorCode"
              ],
              "properties": {
                "displayMessage": {
                  "description": "An error message that can be displayed to the user.",
                  "type": "string"
                },
                "errorCode": {
                  "description": "An error code; one of:\n- ` + "`" + `insufficientFund` + "`" + ` – The account had not enough fund to\n  cover the deposit.\n",
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "The player account does not exist."
          },
          "503": {
            "description": "Firebase DB error.",
            "schema": {
              "type": "object",
              "properties": {
                "msg": {
                  "type": "string"
                }
              }
            }
          },
          "504": {
            "description": "Blockchain RPC call failed.",
            "schema": {
              "type": "object",
              "properties": {
                "msg": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/reg": {
      "post": {
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "summary": "FE \u0026 ContentOS calls this API when the Harmony game is loaded.",
        "operationId": "postReg",
        "parameters": [
          {
            "type": "string",
            "description": "Temporary COS login token.",
            "name": "token",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "An existing user.",
            "schema": {
              "$ref": "#/definitions/postRegResponse"
            }
          },
          "201": {
            "description": "A new user.  FE should instruct the user to check email.",
            "schema": {
              "$ref": "#/definitions/postRegResponse"
            },
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string",
                "description": "CORS origin bypass. TODO ek – remove this."
              }
            }
          },
          "401": {
            "description": "The given token is invalid."
          },
          "503": {
            "description": "Firebase DB error.",
            "schema": {
              "type": "object",
              "properties": {
                "msg": {
                  "description": "The error message.",
                  "type": "string"
                }
              }
            }
          },
          "504": {
            "description": "Blockchain RPC call failed.",
            "schema": {
              "type": "object",
              "properties": {
                "msg": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    }
  },
  "definitions": {
    "postRegResponse": {
      "type": "object",
      "properties": {
        "account": {
          "type": "string"
        },
        "balance": {
          "type": "string"
        },
        "email": {
          "type": "string"
        }
      }
    }
  }
}`))
	FlatSwaggerJSON = json.RawMessage([]byte(`{
  "schemes": [
    "https"
  ],
  "swagger": "2.0",
  "info": {
    "description": "Harmony Puzzle is a simple yet addictive blockchain-based puzzle game.\n",
    "title": "Harmony Puzzle",
    "version": "0.0.1"
  },
  "host": "harmony-puzzle-ek.appspot.com",
  "basePath": "/v1",
  "paths": {
    "/finish": {
      "post": {
        "consumes": [
          "application/json"
        ],
        "summary": "FE calls this to post a level",
        "operationId": "postFinish",
        "parameters": [
          {
            "type": "string",
            "description": "user's account private key, hex-encoded",
            "name": "accountKey",
            "in": "query",
            "required": true
          },
          {
            "type": "integer",
            "description": "level number (1-based)",
            "name": "level",
            "in": "query",
            "required": true
          },
          {
            "type": "integer",
            "description": "the solution's height (the same number found in all squares)",
            "name": "height",
            "in": "query"
          },
          {
            "type": "string",
            "description": "user's moves from first to last; [udlr]* in regex",
            "name": "sequence",
            "in": "query",
            "required": true
          },
          {
            "type": "integer",
            "description": "where the cursor was after completing the last move in sequence, in telephone keypad notation (1-9)",
            "name": "last_pos",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "The level has been accepted.",
            "schema": {
              "type": "object",
              "properties": {
                "reward": {
                  "description": "reward amount, in wei (divide by 10^18 to get HRX)",
                  "type": "number"
                }
              }
            }
          },
          "503": {
            "description": "Firebase DB error.",
            "schema": {
              "type": "object",
              "properties": {
                "msg": {
                  "type": "string"
                }
              }
            }
          },
          "504": {
            "description": "Blockchain RPC call failed.",
            "schema": {
              "type": "object",
              "properties": {
                "msg": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/play": {
      "post": {
        "consumes": [
          "application/json"
        ],
        "summary": "FE calls this to start a new game.",
        "operationId": "postPlay",
        "parameters": [
          {
            "type": "string",
            "description": "user's account private key, hex-encoded",
            "name": "accountKey",
            "in": "query",
            "required": true
          },
          {
            "type": "number",
            "description": "user's bet, in wei (divide by 10^18 to get HRX)",
            "name": "stake",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "201": {
            "description": "A new game has been started."
          },
          "403": {
            "description": "The request was denied.",
            "schema": {
              "type": "object",
              "required": [
                "errorCode"
              ],
              "properties": {
                "displayMessage": {
                  "description": "An error message that can be displayed to the user.",
                  "type": "string"
                },
                "errorCode": {
                  "description": "An error code; one of:\n- ` + "`" + `insufficientFund` + "`" + ` – The account had not enough fund to\n  cover the deposit.\n",
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "The player account does not exist."
          },
          "503": {
            "description": "Firebase DB error.",
            "schema": {
              "type": "object",
              "properties": {
                "msg": {
                  "type": "string"
                }
              }
            }
          },
          "504": {
            "description": "Blockchain RPC call failed.",
            "schema": {
              "type": "object",
              "properties": {
                "msg": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/reg": {
      "post": {
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "summary": "FE \u0026 ContentOS calls this API when the Harmony game is loaded.",
        "operationId": "postReg",
        "parameters": [
          {
            "type": "string",
            "description": "Temporary COS login token.",
            "name": "token",
            "in": "query",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "An existing user.",
            "schema": {
              "$ref": "#/definitions/postRegResponse"
            }
          },
          "201": {
            "description": "A new user.  FE should instruct the user to check email.",
            "schema": {
              "$ref": "#/definitions/postRegResponse"
            },
            "headers": {
              "Access-Control-Allow-Origin": {
                "type": "string",
                "description": "CORS origin bypass. TODO ek – remove this."
              }
            }
          },
          "401": {
            "description": "The given token is invalid."
          },
          "503": {
            "description": "Firebase DB error.",
            "schema": {
              "type": "object",
              "properties": {
                "msg": {
                  "description": "The error message.",
                  "type": "string"
                }
              }
            }
          },
          "504": {
            "description": "Blockchain RPC call failed.",
            "schema": {
              "type": "object",
              "properties": {
                "msg": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    }
  },
  "definitions": {
    "postRegResponse": {
      "type": "object",
      "properties": {
        "account": {
          "type": "string"
        },
        "balance": {
          "type": "string"
        },
        "email": {
          "type": "string"
        }
      }
    }
  }
}`))
}
