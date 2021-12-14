const Configurations = {
  "Result": {
    "Instagram": {
      "Width": 1080,
      "Height": 1920,
      "GameType": {
        "CSGO": {
          "RandomLayer": {
            "ChangeLayer3ToVictoryLabel": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/result/instagram/Layer_2/csgo/Victory/1.png",
                "/assets/result/instagram/Layer_2/csgo/Victory/2.png",
                "/assets/result/instagram/Layer_2/csgo/Victory/3.png",
                "/assets/result/instagram/Layer_2/csgo/Victory/4.png"
              ]
            },
            "ChangeLayer3ToDefeatLabel": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/result/instagram/Layer_2/csgo/Defeat/1.png",
                "/assets/result/instagram/Layer_2/csgo/Defeat/2.png",
                "/assets/result/instagram/Layer_2/csgo/Defeat/3.png",
                "/assets/result/instagram/Layer_2/csgo/Defeat/4.png"
              ]
            }
          },
          "Layers": {
            "2": "/assets/result/instagram/Layer_3/csgo/1.png"
          },
          "Overwrite": {
            "ChangeLayer3ToVictoryLabel": [
              {
                "Id": "2",
                "Value": "/assets/result/instagram/Layer_3/csgo/1.png"
              },
              {
                "Id": "1",
                "Type": "RandomLayer"
              }
            ],
            "ChangeLayer3ToDefeatLabel": [
              {
                "Id": "2",
                "Value": "/assets/result/instagram/Layer_3/csgo/2.png"
              },
              {
                "Id": "1",
                "Type": "RandomLayer"
              }
            ],
            "ChangeLayer3ToDrawLabel": []
          }
        },
        "VALORANT": {
          "RandomLayer": {
            "ChangeLayer3ToVictoryLabel": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/result/instagram/Layer_2/valorant/Victory/1.png",
                "/assets/result/instagram/Layer_2/valorant/Victory/2.png",
                "/assets/result/instagram/Layer_2/valorant/Victory/3.png"
              ]
            },
            "ChangeLayer3ToDefeatLabel": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/result/instagram/Layer_2/valorant/Defeat/1.png",
                "/assets/result/instagram/Layer_2/valorant/Defeat/2.png",
                "/assets/result/instagram/Layer_2/valorant/Defeat/3.png"
              ]
            },
            "ChangeLayer3ToDrawLabel": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/result/instagram/Layer_2/valorant/Defeat/1.png",
                "/assets/result/instagram/Layer_2/valorant/Defeat/2.png",
                "/assets/result/instagram/Layer_2/valorant/Defeat/3.png"
              ]
            }
          },
          "Layers": {
            "2": "/assets/result/instagram/Layer_3/valorant/2.png"
          },
          "Overwrite": {
            "ChangeLayer3ToVictoryLabel": [
              {
                "Id": "2",
                "Value": "/assets/result/instagram/Layer_3/valorant/2.png"
              },
              {
                "Id": "1",
                "Type": "RandomLayer"
              }
            ],
            "ChangeLayer3ToDefeatLabel": [
              {
                "Id": "2",
                "Value": "/assets/result/instagram/Layer_3/valorant/0.png"
              },
              {
                "Id": "1",
                "Type": "RandomLayer"
              }
            ],
            "ChangeLayer3ToDrawLabel": [
              {
                "Id": "2",
                "Value": "/assets/result/instagram/Layer_3/valorant/1.png"
              },
              {
                "Id": "1",
                "Type": "RandomLayer"
              }
            ]
          }
        }
      },
      "Layers": {
        "0": "/assets/result/instagram/Layer_1.png",
      },
      "Fields": [
        {
          "Id": "campeonato",
          "Type": "text",
          "X": 25,
          "Y": 1330,
          "Font": "54px BebasNeueRegular",
          "Color": "white"
        },
        {
          "Id": "score",
          "Type": "text",
          "X": 420,
          "Y": 1500,
          "Font": "53pt HansonBold",
          "Color": "white",
          "TextAlign": "center"
        },
        {
          "Id": "team1logo",
          "Type": "image",
          "X": 45,
          "Y": 1380,
          "Width": 205,
          "Height": 205
        },
        {
          "Id": "team2logo",
          "Type": "image",
          "X": 585,
          "Y": 1380,
          "Width": 205,
          "Height": 205
        },
        {
          "Id": "ligalogo",
          "Type": "image",
          "X": 40,
          "Y": 1260,
          "Width": 500,
          "Height": 100,
          "ForceRenderX": true
        }
      ],
      "Overwrite": {
      }
    },
    "Twitter": {
      "Width": 1920,
      "Height": 1080,
      "GameType": {
        "CSGO": {
          "RandomLayer": {
            "ChangeLayer3ToVictoryLabel": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/result/twitter/Layer_2/csgo/Victory/1.png",
                "/assets/result/twitter/Layer_2/csgo/Victory/2.png",
                "/assets/result/twitter/Layer_2/csgo/Victory/3.png",
                "/assets/result/twitter/Layer_2/csgo/Victory/4.png"
              ]
            },
            "ChangeLayer3ToDefeatLabel": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/result/twitter/Layer_2/csgo/Defeat/1.png",
                "/assets/result/twitter/Layer_2/csgo/Defeat/2.png",
                "/assets/result/twitter/Layer_2/csgo/Defeat/3.png",
                "/assets/result/twitter/Layer_2/csgo/Defeat/4.png"
              ]
            }
          },
          "Layers": {
            "2": "/assets/result/twitter/Layer_3/csgo/1.png"
          },
          "Overwrite": {
            "ChangeLayer3ToVictoryLabel": [
              {
                "Id": "2",
                "Value": "/assets/result/twitter/Layer_3/csgo/1.png"
              },
              {
                "Id": "1",
                "Type": "RandomLayer"
              }
            ],
            "ChangeLayer3ToDefeatLabel": [
              {
                "Id": "2",
                "Value": "/assets/result/twitter/Layer_3/csgo/2.png"
              },
              {
                "Id": "1",
                "Type": "RandomLayer",
                "Value": null
              }
            ],
            "ChangeLayer3ToDrawLabel": []
          }
        },
        "VALORANT": {
          "RandomLayer": {
            "ChangeLayer3ToVictoryLabel": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/result/twitter/Layer_2/valorant/Victory/1.png",
                "/assets/result/twitter/Layer_2/valorant/Victory/2.png",
                "/assets/result/twitter/Layer_2/valorant/Victory/3.png"
              ]
            },
            "ChangeLayer3ToDefeatLabel": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/result/twitter/Layer_2/valorant/Defeat/1.png",
                "/assets/result/twitter/Layer_2/valorant/Defeat/2.png",
                "/assets/result/twitter/Layer_2/valorant/Defeat/3.png",
              ]
            },
            "ChangeLayer3ToDrawLabel": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/result/twitter/Layer_2/valorant/Defeat/1.png",
                "/assets/result/twitter/Layer_2/valorant/Defeat/2.png",
                "/assets/result/twitter/Layer_2/valorant/Defeat/3.png",
              ]
            },
          },
          "Layers": {
            "1": "/assets/result/twitter/Layer_2/valorant/Victory/1.png"
          },
          "Overwrite": {
            "ChangeLayer3ToVictoryLabel": [
              {
                "Id": "2",
                "Value": "/assets/result/twitter/Layer_3/valorant/2.png"
              },
              {
                "Id": "1",
                "Type": "RandomLayer"
              }
            ],
            "ChangeLayer3ToDefeatLabel": [
              {
                "Id": "2",
                "Value": "/assets/result/twitter/Layer_3/valorant/0.png"
              },
              {
                "Id": "1",
                "Type": "RandomLayer"
              }
            ],
            "ChangeLayer3ToDrawLabel": [
              {
                "Id": "2",
                "Value": "/assets/result/twitter/Layer_3/valorant/1.png"
              },
              {
                "Id": "1",
                "Type": "RandomLayer"
              }
            ]
          }
        }
      },
      "Overwrite": {},
      "Layers": {
        "0": "/assets/result/twitter/Layer_1.png"
      },
      "Fields": [
        {
          "Id": "campeonato",
          "Type": "text",
          "X": 1265,
          "Y": 610,
          "Font": "38px BebasNeueRegular",
          "Color": "white",
          "TextAlign": "end"
        },
        {
          "Id": "score",
          "Type": "text",
          "X": 1583,
          "Y": 621,
          "Font": "50pt HansonBold",
          "Color": "white",
          "TextAlign": "center"
        },
        {
          "Id": "team1logo",
          "Type": "image",
          "X": 1317,
          "Y": 545,
          "Width": 115,
          "Height": 115
        },
        {
          "Id": "team2logo",
          "Type": "image",
          "X": 1740,
          "Y": 545,
          "Width": 115,
          "Height": 115
        },
        {
          "Id": "ligalogo",
          "Type": "image",
          "X": 1157,
          "Y": 570,
          "Width": 115,
          "Height": 115
        }
      ]
    }
  },
  "Announcement": {
    "Instagram": {
      "Width": 1080,
      "Height": 1920,
      "Layers": {
        "0": "/assets/announce/instagram/Layer_1.png"
      },
      "GameType": {
        "CSGO": {
          "RandomLayer": {
            "Default": {
              "LayerId": 2,
              "LayerMap": [
                "/assets/announce/instagram/Layer_3/csgo/1.png"
              ]
            }
          },
          "Layers": {
            "1": "/assets/announce/instagram/Layer_2/csgo/2.png",
          },
          "Overwrite": {
            "ChangeToLayoutWithText": [
              {
                "Id": "2",
                "Value": "/assets/announce/instagram/Layer_3/csgo/2.png"
              },
              {
                "Id": "team1logo",
                "Type": "image",
                "X": 33,
                "Y": 1381,
                "Width": 200,
                "Height": 200
              },
              {
                "Id": "team2logo",
                "Type": "image",
                "X": 444,
                "Y": 1381,
                "Width": 200,
                "Height": 200
              },
              {
                "Id": "hora",
                "Type": "text",
                "X": 520,
                "Y": 1160,
                "Font": "48px HansonBold",
                "Color": "white",
              },
              {
                "Id": "data",
                "Type": "text",
                "X": 520,
                "Y": 1250,
                "Font": "48px HansonBold",
                "Color": "white",
                "IsStrokeText": true
              },
            ]
          }
        },
        "VALORANT": {
          "RandomLayer": {
            "Default": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/announce/instagram/Layer_2/valorant/1.png",
                "/assets/announce/instagram/Layer_2/valorant/2.png",
                "/assets/announce/instagram/Layer_2/valorant/3.png"
              ]
            }
          },
          "Layers": {
            "2": "/assets/announce/instagram/Layer_3/valorant/2.png"
          },
          "Overwrite": {
            "ChangeToLayoutWithText": [
              {
                "Id": "2",
                "Value": "/assets/announce/instagram/Layer_3/valorant/1.png"
              },
              {
                "Id": "team1logo",
                "Type": "image",
                "X": 33,
                "Y": 1381,
                "Width": 200,
                "Height": 200
              },
              {
                "Id": "team2logo",
                "Type": "image",
                "X": 444,
                "Y": 1381,
                "Width": 200,
                "Height": 200
              },
              {
                "Id": "hora",
                "Type": "text",
                "X": 520,
                "Y": 1160,
                "Font": "48px HansonBold",
                "Color": "white",
              },
              {
                "Id": "data",
                "Type": "text",
                "X": 520,
                "Y": 1250,
                "Font": "48px HansonBold",
                "Color": "white",
                "IsStrokeText": true
              },
            ]
          }
        }
      },
      "Fields": [
        {
          "Id": "hora",
          "Type": "text",
          "X": 505,
          "Y": 1285,
          "Font": "48px HansonBold",
          "Color": "white"
        },
        {
          "Id": "data",
          "Type": "text",
          "X": 505,
          "Y": 1365,
          "Font": "48px HansonBold",
          "Color": "white",
          "IsStrokeText": true
        },
        {
          "Id": "campeonato",
          "Type": "text",
          "X": 25,
          "Y": 1330,
          "Font": "54px BebasNeueRegular",
          "Color": "white"
        },
        {
          "Id": "team1logo",
          "Type": "image",
          "X": 33,
          "Y": 1421,
          "Width": 160,
          "Height": 160
        },
        {
          "Id": "team2logo",
          "Type": "image",
          "X": 360,
          "Y": 1421,
          "Width": 160,
          "Height": 160
        },
        {
          "Id": "ligalogo",
          "Type": "image",
          "X": 574,
          "Y": 1421,
          "Width": 500,
          "Height": 160,
          "ForceRenderX": true
        }
      ],
      "Overwrite": {
      }
    },
    "Twitter": {
      "Width": 1920,
      "Height": 1080,
      "GameType": {
        "CSGO": {
          "RandomLayer": {
            "Default": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/announce/twitter/Layer_2/csgo/1.png",
                "/assets/announce/twitter/Layer_2/csgo/2.png",
                "/assets/announce/twitter/Layer_2/csgo/3.png",
                "/assets/announce/twitter/Layer_2/csgo/4.png",
              ]
            }
          },
          "Layers": {
            "2": "/assets/announce/twitter/Layer_3/csgo/1.png"
          },
          "Overwrite": {
            "ChangeToLayoutWithText": [
              {
                "Id": "2",
                "Value": "/assets/announce/twitter/Layer_3/csgo/2.png"
              },
            ]
          }
        },
        "VALORANT": {
          "RandomLayer": {
            "Default": {
              "LayerId": 1,
              "LayerMap": [
                "/assets/announce/twitter/Layer_2/valorant/1.png",
                "/assets/announce/twitter/Layer_2/valorant/2.png",
                "/assets/announce/twitter/Layer_2/valorant/3.png"
              ]
            }
          },
          "Layers": {
            "2": "/assets/announce/twitter/Layer_3/valorant/1.png"
          },
          "Overwrite": {
            "ChangeToLayoutWithText": [
              {
                "Id": "2",
                "Value": "/assets/announce/twitter/Layer_3/valorant/2.png"
              }
            ]
          }
        }
      },
      "Overwrite": {
      },
      "Layers": {
        "0": "/assets/announce/twitter/Layer_1.png"
      },
      "Fields": [
        {
          "Id": "hora",
          "Type": "text",
          "X": 590,
          "Y": 505,
          "Font": "48px HansonBold",
          "Color": "white"
        },
        {
          "Id": "data",
          "Type": "text",
          "X": 590,
          "Y": 585,
          "Font": "48px HansonBold",
          "Color": "white",
          "IsStrokeText": true
        },
        {
          "Id": "campeonato",
          "Type": "text",
          "X": 790,
          "Y": 795,
          "Font": "38px BebasNeueRegular",
          "Color": "white",
          "TextAlign": "center"
        },
        {
          "Id": "team1logo",
          "Type": "image",
          "X": 44,
          "Y": 704,
          "Width": 160,
          "Height": 160
        },
        {
          "Id": "team2logo",
          "Type": "image",
          "X": 374,
          "Y": 704,
          "Width": 160,
          "Height": 160
        },
        {
          "Id": "ligalogo",
          "Type": "image",
          "X": 574,
          "Y": 704,
          "Width": 160,
          "Height": 160
        }
      ]
    }
  }
}

export {
  Configurations
}