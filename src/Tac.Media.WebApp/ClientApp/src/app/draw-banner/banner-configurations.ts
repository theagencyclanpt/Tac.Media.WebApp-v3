const Configurations = {
  "Result": {
    "Instagram": {
      "Preview": {
        "Width": "400px",
        "Height": "704px",
      },
      "Width": 1080,
      "Height": 1920,
      "Layers": {
        "0": "/assets/csgo.result/instagram/Layer_1.png",
        "1": "/assets/csgo.result/instagram/Layer_2/Defeat/2.png",
        "2": "/assets/csgo.result/instagram/Layer_3/1.png"
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
          "Id": "team1Score",
          "Type": "text",
          "X": 270,
          "Y": 1530,
          "Font": "130px BebasNeueRegular",
          "Color": "white",
          "TextAlign": "start"
        },
        {
          "Id": "team2Score",
          "Type": "text",
          "X": 565,
          "Y": 1530,
          "Font": "130px BebasNeueRegular",
          "Color": "white",
          "TextAlign": "end",
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
          "X": 40,
          "Y": 1230,
          "Width": 500,
          "Height": 160,
          "ForceRenderX": true
        }
      ],
      "Overwrite": {
        "ChangeLayer3ToVictoryLabel": [
          {
            "Id": "2",
            "Value": "/assets/csgo.result/instagram/Layer_3/1.png"
          },
          {
            "Id": "1",
            "Value": "/assets/csgo.result/instagram/Layer_2/Defeat/4.png"
          }
        ],
        "ChangeLayer3ToDefeatLabel": [
          {
            "Id": "2",
            "Value": "/assets/csgo.result/instagram/Layer_3/2.png"
          },
          {
            "Id": "1",
            "Value": "/assets/csgo.result/instagram/Layer_2/Defeat/2.png"
          }
        ]
      }
    },
    "Twitter": {
      "Width": 1920,
      "Height": 1080,
      "Preview": {
        "Width": "979px",
        "Height": "580px",
      },
      "Overwrite": {
        "ChangeLayer3ToVictoryLabel": [
          {
            "Id": "2",
            "Value": "/assets/csgo.result/twitter/Layer_3/2.png"
          },
          {
            "Id": "1",
            "Value": "/assets/csgo.result/twitter/Layer_2/Defeat/4.png"
          }
        ],
        "ChangeLayer3ToDefeatLabel": [
          {
            "Id": "2",
            "Value": "/assets/csgo.result/twitter/Layer_3/1.png"
          },
          {
            "Id": "1",
            "Value": "/assets/csgo.result/twitter/Layer_2/Defeat/2.png"
          }
        ]
      },
      "Layers": {
        "0": "/assets/csgo.result/twitter/Layer_1.png",
        "1": "/assets/csgo.result/twitter/Layer_2/Defeat/1.png",
        "2": "/assets/csgo.result/twitter/Layer_3/2.png"
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
          "Id": "team1Score",
          "Type": "text",
          "X": 1500,
          "Y": 610,
          "Font": "65px BebasNeueRegular",
          "Color": "white",
          "TextAlign": "start"
        },
        {
          "Id": "team2Score",
          "Type": "text",
          "X": 1265,
          "Y": 610,
          "Font": "38px BebasNeueRegular",
          "Color": "white",
          "TextAlign": "end",
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
      "Preview": {
        "Width": "400px",
        "Height": "704px",
      },
      "Width": 1080,
      "Height": 1920,
      "Layers": {
        "0": "/assets/csgo.announce/instagram/Layer_1.png",
        "1": "/assets/csgo.announce/instagram/Layer_2.png",
        "2": "/assets/csgo.announce/instagram/Layer_3/1.png"
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
          "Color": "white"
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
        "ChangeToLayoutWithText": [
          {
            "Id": "2",
            "Value": "/assets/csgo.announce/instagram/Layer_3/2.png"
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
            "Color": "white"
          },
        ]
      }
    },
    "Twitter": {
      "Width": 1920,
      "Height": 1080,
      "Preview": {
        "Width": "979px",
        "Height": "580px",
      },
      "Overwrite": {
        "ChangeToLayoutWithText": [
          {
            "Id": "2",
            "Value": "/assets/csgo.announce/twitter/Layer_3/2.png"
          }
        ]
      },
      "Layers": {
        "0": "/assets/csgo.announce/twitter/Layer_1.png",
        "1": "/assets/csgo.announce/twitter/Layer_2.png",
        "2": "/assets/csgo.announce/twitter/Layer_3/1.png"
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
          "Color": "white"
        },
        {
          "Id": "campeonato",
          "Type": "text",
          "X": 605,
          "Y": 795,
          "Font": "38px BebasNeueRegular",
          "Color": "white"
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
          "Y": 754,
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