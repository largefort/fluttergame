import 'package:flutter/material.dart';

void main() => runApp(SkillQuestApp());

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
  int skill1Level = 0;
  int skill1Exp = 0;
  int skill2Level = 0;
  int skill2Exp = 0;
  int currency = 0;

  void enterGame() {
    setState(() {
      // Logic to handle entering the game
    });
  }

  void trainSkill(int skillNumber) {
    setState(() {
      // Logic to handle training a skill
    });
  }

  void buyAutoTrain() {
    setState(() {
      // Logic to handle buying auto-train feature
    });
  }

  void saveGame() {
    setState(() {
      // Logic to handle saving the game
    });
  }

  void loadGame() {
    setState(() {
      // Logic to handle loading the game
    });
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
              margin: EdgeInsets.only(top: 20, bottom: 10),
              child: Text(
                'Change Log',
                style: TextStyle(fontSize: 32),
              ),
            ),
            Container(
              margin: EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                children: [
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
                  SkillWidget(
                    skillImage: 'https://raw.githubusercontent.com/largefort/skillquest/main/shadowstrike.png',
                    skillName: 'Shadow Strike',
                    level: skill1Level,
                    exp: skill1Exp,
                    onTrainPressed: () => trainSkill(1),
                  ),
                  SkillWidget(
                    skillImage: 'https://raw.githubusercontent.com/largefort/skillquest/main/earthbender.png',
                    skillName: 'Earth Bender',
                    level: skill2Level,
                    exp: skill2Exp,
                    onTrainPressed: () => trainSkill(2),
                  ),
                  // Add more SkillWidget instances for additional skills
                  SizedBox(height: 20),
                  Text('Coins: $currency'),
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
}

class SkillWidget extends StatelessWidget {
  final String skillImage;
  final String skillName;
  final int level;
  final int exp;
  final VoidCallback onTrainPressed;

  const SkillWidget({
    required this.skillImage,
    required this.skillName,
    required this.level,
    required this.exp,
    required this.onTrainPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300,
      margin: EdgeInsets.symmetric(vertical: 20),
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: Color(0xFF29264E),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.5),
            blurRadius: 8,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Image.network(
            skillImage,
            width: 60,
            height: 60,
            fit: BoxFit.contain,
          ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  skillName,
                  style: TextStyle(fontSize: 20),
                ),
                Text('Level: $level'),
                Text('Exp: $exp'),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: onTrainPressed,
            child: Text('Train'),
          ),
        ],
      ),
    );
  }
}
