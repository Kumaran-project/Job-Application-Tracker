document.addEventListener('DOMContentLoaded', () => {
  const createChannelBtn = document.getElementById('create-channel-btn');
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('close-modal');
  const channelForm = document.getElementById('channel-form');
  const channelList = document.getElementById('channel-list');

  // Show modal
  createChannelBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  // Hide modal
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Add new channel
  channelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const channelNameInput = document.getElementById('channel-name-input').value;
    const newChannel = document.createElement('li');
    newChannel.innerHTML = `<i class="fas fa-hashtag"></i> ${channelNameInput}`;
    channelList.appendChild(newChannel);
    modal.classList.add('hidden');
    channelForm.reset();
  });
});
