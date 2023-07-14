import 'dart:async';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() => runApp(SkillQuestApp());

class Skill {
  String name;
  int level;
  int exp;

  Skill({
    required this.name,
    required this.level,
    required this.exp,
  });
}

class SkillQuestApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Skill Quest',
      home: SkillQuestHomePage(),
    );
  }
}

class SkillQuestHomePage extends StatefulWidget {
  @override
  _SkillQuestHomePageState createState() => _SkillQuestHomePageState();
}

class _SkillQuestHomePageState extends State<SkillQuestHomePage> {
  List<String> skillNames = [
    "Shadow Strike",
    "Dragon Fury",
    "Storm Bolt",
    "Arcane Surge",
    "Venomous Bite",
    "Holy Smite",
    "Inferno Blaze",
    "Frost Nova",
    "Earthquake",
    "Divine Shield",
    "Thunderstorm",
    "Rapid Shot",
    "Crippling Blow",
    "Soul Drain",
    "Whirlwind Slash"
  ];

  List<Skill> skills = [];
  int currency = 100;
  List<int> unlockedSkills = [];

  Timer? trainingInterval;

  @override
  void initState() {
    super.initState();
    initGame();
  }

  void initSkills() {
    for (int i = 0; i < skillNames.length; i++) {
      skills.add(
        Skill(
          name: skillNames[i],
          level: i == 0 ? 0 : -1,
          exp: 0,
        ),
      );
    }
  }

  void initGame() {
    initSkills();
    syncSkillLevels();
    updateAllSkills();
    unlockSkills();
  }

  void trainSkill(int skillIndex) {
    Skill skill = skills[skillIndex - 1];
    skill.exp += 10;

    if (skill.exp >= 100) {
      skill.exp = 0;
      skill.level++;
      currency += 10;
      unlockSkills();
      syncSkillLevels();
    }

    updateSkill(skillIndex);
  }

  void unlockSkills() {
    unlockedSkills.clear();
    if (skills[0].level >= 100) {
      for (int i = 1; i < skillNames.length; i++) {
        unlockedSkills.add(i + 1);
      }
    }
  }

  void syncSkillLevels() {
    int mainSkillLevel = skills[0].level;
    for (int i = 1; i < skills.length; i++) {
      skills[i].level = mainSkillLevel;
    }
  }

  void updateSkill(int skillIndex) {
    Skill skill = skills[skillIndex - 1];
    updateCurrency();
    print('Skill ${skillIndex}: Level: ${skill.level}, Exp: ${skill.exp}');
  }

  void updateCurrency() {
    print('Currency: $currency');
  }

  void buyAutoTrain() {
    if (currency >= 100) {
      currency -= 100;
      enableAutoTrain();
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Auto-Train'),
            content: Text('Auto-Train feature purchased successfully!'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: Text('OK'),
              ),
            ],
          );
        },
      );
    } else {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Insufficient Coins'),
            content: Text('Not enough coins to purchase Auto-Train feature!'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: Text('OK'),
              ),
            ],
          );
        },
      );
    }
  }

  void enableAutoTrain() {
    trainingInterval = Timer.periodic(Duration(milliseconds: 100), (timer) {
      trainSkill(1);
      trainSkill(2);
    });
  }

  void disableAutoTrain() {
    trainingInterval?.cancel();
  }

  Future<void> saveGame() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    List<Map<String, dynamic>> skillData = [];
    for (Skill skill in skills) {
      skillData.add({
        'name': skill.name,
        'level': skill.level,
        'exp': skill.exp,
      });
    }
    await prefs.setString('skillQuestSaveData', skillData.toString());
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Save Game'),
          content: Text('Game saved successfully!'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  }

  Future<void> loadGame() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? savedData = prefs.getString('skillQuestSaveData');
    if (savedData != null) {
      List<Map<String, dynamic>> skillData = [];
      savedData = savedData.replaceAll('[', '').replaceAll(']', '');
      List<String> skillDataList = savedData.split(', ');
      for (String data in skillDataList) {
        List<String> values = data.split(',');
        skillData.add({
          'name': values[0].split(':')[1].trim(),
          'level': int.parse(values[1].split(':')[1].trim()),
          'exp': int.parse(values[2].split(':')[1].trim()),
        });
      }

      for (int i = 0; i < skillData.length; i++) {
        skills[i].name = skillData[i]['name'];
        skills[i].level = skillData[i]['level'];
        skills[i].exp = skillData[i]['exp'];
      }

      updateAllSkills();
      updateCurrency();
      unlockSkills();

      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Load Game'),
            content: Text('Game loaded successfully!'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: Text('OK'),
              ),
            ],
          );
        },
      );
    } else {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('No Saved Data'),
            content: Text('No saved game data found!'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: Text('OK'),
              ),
            ],
          );
        },
      );
    }
  }

  void updateAllSkills() {
    for (int i = 1; i <= skills.length; i++) {
      updateSkill(i);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Skill Quest'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              margin: EdgeInsets.only(bottom: 20),
              child: Column(
                children: [
                  Text(
                    'Change Log',
                    style: TextStyle(fontSize: 32),
                  ),
                  SizedBox(height: 10),
                  Text('Welcome to Skill Quest version 1.0!'),
                  SizedBox(height: 10),
                  Text('Here are some of the exciting new features:'),
                  SizedBox(height: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('- Unlock new skills as you level up your "Shadow Strike" skill to level 100!'),
                      Text('- Purchase the Auto-Train feature to automatically train your skills.'),
                      Text('- Save and load your game progress.'),
                    ],
                  ),
                  SizedBox(height: 10),
                  ElevatedButton(
                    onPressed: enterGame,
                    child: Text('Play Game'),
                  ),
                ],
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 20),
              child: Column(
                children: [
                  Text(
                    'Skill Quest',
                    style: TextStyle(fontSize: 32),
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () => trainSkill(1),
                    child: Text('Train Skill 1'),
                  ),
                  ElevatedButton(
                    onPressed: () => trainSkill(2),
                    child: Text('Train Skill 2'),
                  ),
                  SizedBox(height: 20),
                  Text('Currency: $currency'),
                  ElevatedButton(
                    onPressed: buyAutoTrain,
                    child: Text('Buy Auto-Train'),
                  ),
                  SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      ElevatedButton(
                        onPressed: saveGame,
                        child: Text('Save Game'),
                      ),
                      ElevatedButton(
                        onPressed: loadGame,
                        child: Text('Load Game'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  void enterGame() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Enter Game'),
          content: Text('Entering the game!'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
                initGame();
              },
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  }
}
