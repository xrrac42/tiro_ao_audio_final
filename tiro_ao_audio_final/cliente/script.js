document.addEventListener('DOMContentLoaded', () => {
    const musicListElement = document.getElementById('musicList');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseButton = document.getElementById('playPauseButton');
    const backButton = document.getElementById('backButton');
    const forwardButton = document.getElementById('forwardButton');
    let currentSongIndex = 0;

    async function getMusicList() {
        try {
            const response = await fetch('http://localhost:3000/songs');
            const musicList = await response.json();

            musicList.forEach((song, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = song;
                listItem.dataset.index = index; // Armazenar o índice na propriedade dataset
                musicListElement.appendChild(listItem);
            });

            musicListElement.addEventListener('click', (event) => {
                const clickedElement = event.target;
                if (clickedElement.tagName === 'LI') {
                    const index = parseInt(clickedElement.dataset.index, 10);
                    playMusic(index);
                }
            });
        } catch (error) {
            console.error('Erro ao obter a lista de músicas do servidor:', error);
        }
    }

    function playMusic(index) {
        const fileName = musicListElement.children[index].textContent;
        const musicUrl = `http://localhost:3000/stream/${fileName}`;
        audioPlayer.src = musicUrl;
        currentSongIndex = index;

        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = 'Play';
        }
    }

    backButton.addEventListener('click', () => {
        if (currentSongIndex > 0) {
            playMusic(currentSongIndex - 1);
        }
    });

    forwardButton.addEventListener('click', () => {
        if (currentSongIndex < musicListElement.children.length - 1) {
            playMusic(currentSongIndex + 1);
        }
    });

    getMusicList();
});
