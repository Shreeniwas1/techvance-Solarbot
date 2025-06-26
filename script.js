// Sidebar toggle functionality
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('.main');
  
  if (!sidebar || !main) return; // Guard against missing elements
  
  sidebar.classList.toggle('collapsed');
  main.classList.toggle('sidebar-collapsed');
  
  // Change toggle button icon if it exists
  const toggleBtn = document.getElementById('sidebarToggle');
  if (toggleBtn) {
    toggleBtn.textContent = sidebar.classList.contains('collapsed') ? '☰' : '✕';
  }
  
  // Store sidebar state in localStorage for persistence
  localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
}

// Ensure the sidebar toggle works on every page load
document.addEventListener('DOMContentLoaded', function() {
  const sidebarToggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('.main');
  
  // Check if there's a stored sidebar state and apply it
  const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  if (sidebarCollapsed && sidebar && main) {
    sidebar.classList.add('collapsed');
    main.classList.add('sidebar-collapsed');
    
    if (sidebarToggleBtn) {
      sidebarToggleBtn.textContent = '☰';
    }
  }
  
  if (sidebarToggleBtn) {
    // Remove any existing event listeners to avoid duplicates
    sidebarToggleBtn.removeEventListener('click', toggleSidebar);
    
    // Add the event listener
    sidebarToggleBtn.addEventListener('click', toggleSidebar);
  }

  // Collapse sidebar on nav item click in mobile view
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Check for mobile view and if sidebar is open
      if (window.innerWidth <= 768 && sidebar && !sidebar.classList.contains('collapsed')) {
        toggleSidebar();
      }
    });
  });
  
  // Rest of the DOMContentLoaded initialization code
  const profilePic = document.getElementById('profilePic');
  if (profilePic) {
    profilePic.addEventListener('click', toggleProfileDropdown);
  }

  const verificationCode = document.getElementById('verification-code');
  if (verificationCode) {
    verificationCode.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        verifyCode();
      }
    });
  }

  // Add click handlers for day selection in weekly tab
  document.querySelectorAll('.days button').forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('selected');
    });
  });

  const startButton = document.querySelector('.start');
  if (startButton) {
    startButton.onclick = showModal;
  }
});

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
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'verification-modal';
  modalOverlay.className = 'modal-overlay';

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Create modal header
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  const modalTitle = document.createElement('h3');
  modalTitle.textContent = 'Admin Verification Required';
  const closeButton = document.createElement('button');
  closeButton.className = 'close-btn';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = closeModal;
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);
  modalContent.appendChild(modalHeader);

  // Create modal body
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  const modalText = document.createElement('p');
  modalText.textContent = 'Please enter your verification code to start the robot.';
  const codeLabel = document.createElement('label');
  codeLabel.setAttribute('for', 'verification-code');
  codeLabel.textContent = 'Verification Code';
  const codeInput = document.createElement('input');
  codeInput.type = 'password';
  codeInput.id = 'verification-code';
  codeInput.placeholder = 'Enter code...';
  const demoNote = document.createElement('p');
  demoNote.className = 'demo-note';
  demoNote.innerHTML = 'For demo purposes, use code: <strong>123456</strong>';
  modalBody.appendChild(modalText);
  modalBody.appendChild(codeLabel);
  modalBody.appendChild(codeInput);
  modalBody.appendChild(demoNote);
  modalContent.appendChild(modalBody);

  // Create modal footer
  const modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';
  const cancelButton = document.createElement('button');
  cancelButton.className = 'cancel-btn';
  cancelButton.textContent = 'Cancel';
  cancelButton.onclick = closeModal;
  const verifyButton = document.createElement('button');
  verifyButton.className = 'verify-btn';
  verifyButton.textContent = 'Verify & Start';
  verifyButton.onclick = verifyCode;
  modalFooter.appendChild(cancelButton);
  modalFooter.appendChild(verifyButton);
  modalContent.appendChild(modalFooter);

  modalOverlay.appendChild(modalContent);

  // Append modal to body
  document.body.appendChild(modalOverlay);
  document.body.classList.add('modal-open');

  // Focus on the input
  document.getElementById('verification-code').focus();
}

function closeModal() {
  const modalOverlay = document.getElementById('verification-modal');
  if (modalOverlay) {
    document.body.classList.remove('modal-open');
    document.body.removeChild(modalOverlay);
  }
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

document.addEventListener("DOMContentLoaded", () => {
      const tabs = document.querySelectorAll(".srms-tab-button");
      const componentsSection = document.getElementById("srms-components");
      const maintenanceSection = document.getElementById("srms-maintenance");

      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
          // Toggle active tab
          tabs.forEach(t => t.classList.remove("srms-tab-active"));
          tab.classList.add("srms-tab-active");

          // Show/hide sections
          if (tab.dataset.tab === "components") {
            componentsSection.style.display = "block";
            maintenanceSection.style.display = "none";
          } else {
            componentsSection.style.display = "none";
            maintenanceSection.style.display = "block";
          }
        });
      });
    });

//done