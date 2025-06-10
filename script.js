// Sidebar toggle functionality
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const main = document.getElementById('main');
      const toggleBtn = document.getElementById('sidebarToggle');

      sidebar.classList.toggle('collapsed');
      main.classList.toggle('sidebar-collapsed');

      // Change toggle button icon
      toggleBtn.textContent = sidebar.classList.contains('collapsed') ? '☰' : '✕';
    }

    // Profile dropdown functionality
    function toggleProfileDropdown() {
      const dropdown = document.getElementById('profileDropdown');
      dropdown.classList.toggle('show');
    }

    function handleProfileAction(action) {
      const dropdown = document.getElementById('profileDropdown');
      dropdown.classList.remove('show');

      switch (action) {
        case 'profile':
          alert('Opening Profile...');
          break;
        case 'settings':
          alert('Opening Settings...');
          break;
        case 'logout':
          if (confirm('Are you sure you want to logout?')) {
            alert('Logging out...');
            // Add logout functionality here
          }
          break;
      }
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
      const profileContainer = document.querySelector('.profile-container');
      const dropdown = document.getElementById('profileDropdown');

      if (!profileContainer.contains(event.target)) {
        dropdown.classList.remove('show');
      }
    });

    function showTab(tab, event) {
      // Hide all tab contents
      document.querySelectorAll(".tab-content").forEach((el) => {
        el.classList.add("hidden");
        el.classList.remove("active");
      });

      // Show the selected tab content
      const selectedTab = document.getElementById(tab);
      selectedTab.classList.remove("hidden");
      selectedTab.classList.add("active");

      // Update active button
      document.querySelectorAll(".tab-button").forEach((el) =>
        el.classList.remove("active")
      );
      event.target.classList.add("active");
    }

    // Modal functions
    function showModal() {
      document.getElementById('verification-modal').style.display = 'flex';
      document.body.classList.add('modal-open');
    }

    function closeModal() {
      document.getElementById('verification-modal').style.display = 'none';
      document.body.classList.remove('modal-open');
      document.getElementById('verification-code').value = '';
    }

    function verifyCode() {
      const code = document.getElementById('verification-code').value;
      const correctCode = '123456';

      if (code === correctCode) {
        // Success - start the robot
        alert('Verification successful! Robot starting...');
        closeModal();
        // Here you can add actual robot start functionality
        updateRobotStatus('running');
      } else {
        // Failed verification
        alert('Invalid verification code. Please try again.');
        document.getElementById('verification-code').value = '';
        document.getElementById('verification-code').focus();
      }
    }

    function updateRobotStatus(status) {
      const statusDot = document.querySelector('.status-dot');
      const statusText = statusDot.nextSibling;
      const startButton = document.querySelector('.start');

      if (status === 'running') {
        statusDot.className = 'status-dot running';
        statusText.textContent = ' Running';
        startButton.textContent = '⏸ Stop';
        startButton.onclick = stopRobot;
      } else {
        statusDot.className = 'status-dot stopped';
        statusText.textContent = ' Stopped';
        startButton.textContent = '▶ Start';
        startButton.onclick = showModal;
      }
    }

    function stopRobot() {
      // Stop the robot
      alert('Robot stopped successfully!');
      updateRobotStatus('stopped');
    }

    // Initialize the start button click handler when page loads
    document.addEventListener('DOMContentLoaded', function () {
      const startButton = document.querySelector('.start');
      if (startButton) {
        startButton.onclick = showModal;
      }

      // Sidebar toggle event listener
      document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);

      // Profile pic click event listener
      document.getElementById('profilePic').addEventListener('click', toggleProfileDropdown);

      // Allow Enter key to submit verification
      document.getElementById('verification-code').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          verifyCode();
        }
      });

      // Add click handlers for day selection in weekly tab
      document.querySelectorAll('.days button').forEach(button => {
        button.addEventListener('click', function () {
          this.classList.toggle('selected');
        });
      });
    });