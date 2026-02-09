document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('magicButton');
    const clickCountElement = document.getElementById('clickCount');
    
    let clickCount = 0;
    let colorIndex = 0;
    const colors = ['color-white', 'color-blue', 'color-red'];
    
    // Начальный цвет - белый (первый цвет флага России)
    button.classList.add(colors[colorIndex]);
    
    button.addEventListener('click', function() {
        // Увеличиваем счетчик кликов
        clickCount++;
        clickCountElement.textContent = clickCount;
        
        // Удаляем текущий класс цвета
        button.classList.remove(colors[colorIndex]);
        
        // Переходим к следующему цвету
        colorIndex = (colorIndex + 1) % colors.length;
        
        // Добавляем новый класс цвета
        button.classList.add(colors[colorIndex]);
        
        // Анимация нажатия
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Воспроизводим звук клика (опционально)
        playClickSound();
    });
    
    function playClickSound() {
        // Создаем простой звук клика
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Добавляем эффект при наведении
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});