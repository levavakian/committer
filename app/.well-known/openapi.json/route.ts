import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const data = {
    "openapi": "3.0.0",
    "info": {
      "title": "CommitterAPI",
      "version": "1.0.0"
    },
    "paths": {
      "/api/user": {
        "get": {
          "operationId": "getUser",
          "summary": "Retrieve the username of the current user",
          "description": "Can be used to retrieve the github username of the current user of the plugin. This is useful for example if they refer to a repo with no username, implying that it is their own repo.",
          "responses": {
            "200": {
              "description": "The username of the current user using the plugin.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "username": {
                        "type": "string",
                        "description": "The username deduced from the bearer token."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/put": {
        "post": {
          "operationId": "putFile",
          "summary": "Create or update a file in a repository",
          "description": "Given a repo, filepath, commit message, and contents, checks if the file already exists, if so it gets the sha, then it creates or overwrites a file at that path with the contents.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "repo": {
                      "type": "string",
                      "description": "The name of the repository (for example openai/gym)."
                    },
                    "filepath": {
                      "type": "string",
                      "description": "The path to the file in the repository."
                    },
                    "message": {
                      "type": "string",
                      "description": "The commit message."
                    },
                    "content": {
                      "type": "string",
                      "description": "The new file content."
                    }
                  },
                  "required": ["repo", "filepath", "message", "content"]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "File created or updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "A confirmation message."
                      }
                    }
                  }
                }
              }
            },
            "200": {
              "description": "File created or updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "A confirmation message."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/patch": {
        "post": {
          "operationId": "patchFile",
          "summary": "Appends content to the end of an existing file.",
          "description": "Given a repo, filepath, commit message, and contents, append the contents to the end of an existing file in the repo. This appends directly to the end of the file, so if you want to start at the next you line you have to explicitly include the newline at the start of the content.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "repo": {
                      "type": "string",
                      "description": "The name of the repository (for example openai/gym)."
                    },
                    "filepath": {
                      "type": "string",
                      "description": "The path to the file in the repository."
                    },
                    "message": {
                      "type": "string",
                      "description": "The commit message."
                    },
                    "content": {
                      "type": "string",
                      "description": "The file content to append."
                    }
                  },
                  "required": ["repo", "filepath", "message", "content"]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "File updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "A confirmation message."
                      }
                    }
                  }
                }
              }
            },
            "200": {
              "description": "File updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "A confirmation message."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/delete": {
        "post": {
          "operationId": "deleteFile",
          "summary": "Deletes a filepath from the repo. This is done via commit so it is nondestructive.",
          "description": "Given a repo, filepath, and commit message, deletes a filepath in the repo.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "repo": {
                      "type": "string",
                      "description": "The name of the repository (for example openai/gym)."
                    },
                    "filepath": {
                      "type": "string",
                      "description": "The path to the file in the repository."
                    },
                    "message": {
                      "type": "string",
                      "description": "The commit message."
                    }
                  },
                  "required": ["repo", "filepath", "message"]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "File deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "A confirmation message."
                      }
                    }
                  }
                }
              }
            },
            "202": {
              "description": "File deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "A confirmation message."
                      }
                    }
                  }
                }
              }
            },
            "200": {
              "description": "File deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "A confirmation message."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/load": {
        "post": {
          "operationId": "loadRepo",
          "summary": "Retrieve a file from a repository",
          "description": "Given a repo, retrieves the full file list as well as the top level README.md if there is one.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "repo": {
                      "type": "string",
                      "description": "The name of the repository (for example openai/gym)."
                    }
                  },
                  "required": ["repo"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Repo loaded successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "readme": {
                        "type": "string",
                        "description": "The top level README.md.",
                        "nullable": true
                      },
                      "tree": {
                        "type": "string",
                        "description": "The directory tree of the repository."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/get": {
        "post": {
          "operationId": "getFile",
          "summary": "Retrieve a file from a repository",
          "description": "Given a user, repo, and filepath, retrieves the specified file.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "repo": {
                      "type": "string",
                      "description": "The name of the repository (for example openai/gym)."
                    },
                    "filepath": {
                      "type": "string",
                      "description": "The path to the file in the repository."
                    }
                  },
                  "required": ["repo", "filepath"]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "File retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "fileData": {
                        "type": "string",
                        "description": "The contents of the retrieved file."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  return NextResponse.json(data);
}
