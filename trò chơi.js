// Khởi tạo nhân vật
let player = {
  level: 1,
  exp: 0,
  health: 100,
  maxHealth: 100,
};

// Khởi tạo quái
let enemy = {
  name: "Quái cấp 1",
  health: 50,
  maxHealth: 50,
  level: 1,
};

// EXP cần thiết để lên cấp
let expToNextLevel = 100;

// Xử lý sự kiện tấn công
document.getElementById("attack-button").addEventListener("click", () => {
  // Gây sát thương cho quái
  let damage = Math.floor(Math.random() * 20) + 10;
  enemy.health -= damage;

  // Cập nhật giao diện máu quái
  updateEnemyHealth();

  // Nếu quái chết
  if (enemy.health <= 0) {
    player.exp += 50; // Thêm EXP cho người chơi
    checkLevelUp(); // Kiểm tra lên cấp
    respawnEnemy(); // Tạo quái mới
  } else {
    // Quái phản đòn
    let enemyDamage = Math.floor(Math.random() * 15) + 5;
    player.health -= enemyDamage;
    updatePlayerHealth();
  }

  // Kiểm tra nếu người chơi chết
  if (player.health <= 0) {
    alert("Bạn đã thua! Bắt đầu lại từ Level 1.");
    resetGame();
  }
});

// Hàm cập nhật máu quái
function updateEnemyHealth() {
  const enemyHealthElement = document.getElementById("enemy-health");
  enemyHealthElement.textContent = enemy.health > 0 ? enemy.health : 0;
}

// Hàm cập nhật máu người chơi
function updatePlayerHealth() {
  const playerHealthElement = document.getElementById("player-health");
  playerHealthElement.textContent = player.health > 0 ? player.health : 0;
}

// Hàm kiểm tra lên cấp
function checkLevelUp() {
  if (player.exp >= expToNextLevel) {
    player.level++;
    player.exp -= expToNextLevel;
    expToNextLevel += 50; // Tăng EXP cần thiết cho cấp tiếp theo
    player.health = player.maxHealth; // Hồi máu đầy đủ
    updateGameStatus();
    alert(`Chúc mừng! Bạn đã lên Level ${player.level}`);
  }
}

// Hàm tạo lại quái
function respawnEnemy() {
  enemy.level++;
  enemy.name = `Quái cấp ${enemy.level}`;
  enemy.maxHealth += 20;
  enemy.health = enemy.maxHealth;
  updateEnemy();
}

// Hàm cập nhật giao diện quái
function updateEnemy() {
  document.getElementById("enemy-name").textContent = enemy.name;
  document.getElementById("enemy-health").textContent = enemy.health;
}

// Hàm cập nhật trạng thái người chơi
function updateGameStatus() {
  document.getElementById("player-level").textContent = player.level;
  document.getElementById("player-exp").textContent = player.exp;
  document.getElementById("exp-to-next").textContent = expToNextLevel;
  document.getElementById("player-health").textContent = player.health;
}

// Hàm reset game
function resetGame() {
  player.level = 1;
  player.exp = 0;
  player.health = player.maxHealth = 100;
  enemy.level = 1;
  enemy.health = enemy.maxHealth = 50;
  enemy.name = "Quái cấp 1";
  expToNextLevel = 100;
  updateGameStatus();
  updateEnemy();
}

// Khởi chạy game
updateGameStatus();
updateEnemy();
