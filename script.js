document.addEventListener('DOMContentLoaded', function () {
  // ====================== Menu Functionality ======================
  const initMenu = () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    const currentPath = window.location.pathname.split("/").pop();
    const navbar = document.querySelector('.navbar');

    const toggleMenu = () => {
      menu.classList.toggle('active');
      const icon = mobileMenuToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
      if (menu.classList.contains('active')) createOverlay();
      else removeOverlay();
    };

    const createOverlay = () => {
      const overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      overlay.addEventListener('click', toggleMenu);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
    };

    const removeOverlay = () => {
      const overlay = document.querySelector('.menu-overlay');
      if (overlay) overlay.remove();
      document.body.style.overflow = '';
    };

    const setActiveItem = (clickedItem) => {
      menuLinks.forEach(item => item.classList.remove('active'));
      clickedItem.classList.add('active');
      if (window.innerWidth <= 768) toggleMenu();
    };

    menuLinks.forEach(link => {
      const linkPath = link.getAttribute("href");
      if (linkPath === currentPath || (linkPath === "index.html" && currentPath === "")) {
        link.classList.add("active");
      }
    });

    mobileMenuToggle.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          setActiveItem(this);
          const targetSection = document.querySelector(href);
          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop - navbar.offsetHeight,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    if (menuLinks.length > 0 && !document.querySelector('.menu-link.active')) {
      menuLinks[0].classList.add('active');
    }
  };

  // ====================== Doctor Modal ======================
  const initDoctorModal = () => {
    const scheduleData = {
       "ডা: মোছাম্মৎ নায়লা হোসেন": [
        "রোগী দেখেন ও অপারেশন করেন: প্রতিদিন বিকাল ৪টা থেকে...",
        "প্রতি বৃহস্পতিবার চেম্বার বন্ধ ",
      ],
      "ডা. মোঃ রবিউল ইসলাম (রনি)": [
        "রোগী দেখেন এবং অপারেশন করেন: প্রতি সোমবার বিকাল ৩টা থেকে..."
      ],
      "ডাঃ মোঃ তোফাজ্জল হুসেন": [
        "রোগী দেখেন : প্রতিদিন বিকাল ৩টা থেকে ও শুক্রবার সকাল ১১টা থেকে..."
      ],
      "ডাঃ এ.বি.এম হাবিবুল্লাহ (হাবিব)": [
        "রোগী দেখেন এবং অপারেশন করেন ঃ শুক্রবার সকাল ১০টা থেকে..."
      ],
      "ডাঃ শাহারিয়ার হোসেন সিদ্দিক (রুভন)": [
        "রোগী দেখেন : প্রতি সোমবার বিকাল ৩টা থেকে রাত ৮টা পর্যন্ত ।"
      ],
      
      "ডাঃ ফয়েজ আহমেদ": [
        "রোগী দেখেন ঃ প্রতি শুক্রবার সকাল ১০টা থেকে..."
      ],

      "ডাঃ মোঃ মঞ্জুরুল হক মিয়া": [
        "রোগী দেখেন ঃ প্রতি শুক্রবার সকাল ১০টা থেকে বিকাল ৪টা পর্যন্ত ।"
      ],

      "ডাঃ মোঃ মোফাজ্জল হোসেন বিদ্যুৎ": [
        " রোগী দেখেন ঃ প্রতি সোমবার বিকাল ৩টা থেকে ও শুক্রবার সকাল ১০টা থেকে....."
      ],
      "ডাঃ অভিজিৎ হোড় (শোভন)": [
        " রোগী দেখেন এবং অপারেশন করেন ঃ শুক্রবার সকাল ১০টা থেকে....."
      ],
      "ডাঃ মোঃ আরিফুল ইসলাম": [
        " রোগী দেখেন ঃ প্রতি শনি - বৃহস্পতিবার দুপুর ২.৩০ থেকে....."
      ],
      "ডাঃ দেবাশীষ বিশ্বাস (পলাশ)": [
        " রোগী দেখেন ঃ প্রতি শুক্রবার সকাল ১০টা থেকে....."
      ],

      "ডাঃ মোঃ আহিদ ইকবাল খোকন": [
        " রোগী দেখেন : প্রতি শুক্রবার সকাল ১০টা থেকে রাত ৮টা পর্যন্ত ।....."
      ],

      "ডাঃ শাহ্ মোঃ আসাদুজ্জামান": [
        " রোগী দেখার সময় ঃ সোমবার বিকাল ৩টা থেকে..."
      ],

      "ডাঃ মোঃ শামছুর রহমান": [
        " রোগী দেখেন এবং অপারেশন করেন ঃ প্রতি- শনি থেকে বৃহস্পতিবার বিকাল ৪টা থেকে...."
      ],

      "ডাঃ এম.সি.পাল (মিন্টু)": [
        " রোগী দেখেন এবং অপারেশন করেন : শুক্রবার সকাল ১০টা থেকে...."
      ],

      "ডাঃ পংকজ কুমার দাস": [
        " রোগী দেখেন : প্রতি শুক্রবার সকাল ১০টা থেকে বিকাল ৩টা পর্যন্ত...."
      ],

      "ডাঃ সাব্বির আহমেদ সোহান": [
        " রোগী দেখেন ও অপারেশন করেন- প্রতি বৃহস্পতি ও শুক্রবার বিকাল ৩টা থেকে রাত ৯টা পর্যন্ত..."
      ],

      "ডাঃ মোঃ মনিরুজ্জামান মনির": [
        " রোগী দেখেন : প্রতি মঙ্গল ও বুধবার বিকাল ৪টা থেকে রাত ৮টা পর্যন্ত..."
      ],

      "ডাঃ দিলশাদ আরমিন (লিজু)": [
        " রোগী দেখেন : প্রতি বুধবার ২টা থেকে রাত ৮টা পর্যন্ত..."
      ],

      "ডাঃ মোহাম্মদ তৌহিদুল ইসলাম (রাজিব)": [
        " রোগী দেখেন ঃ প্রতি মঙ্গল ও বৃহস্পতিবার বিকাল ৩টা থেকে ও শুক্রবার সকাল ১১টা থেকে..."
      ],

      "ডাঃ মবিনা ফেরদৌস": [
        " রোগী দেখেন ঃ প্রতি শনি - বৃহস্পতিবার সকাল ১০টা থেকে...."
      ],

      "ডাঃ রাকিবুল ইসলাম": [
        " রোগী দেখেন ঃ শনি থেকে বুধবার বিকাল ৩টা থেকে..."
      ],
    };

    const modal = document.getElementById("scheduleModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const scheduleList = document.getElementById("scheduleList");

    document.querySelectorAll(".doctor-card .btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const doctorName = this.closest(".doctor-card").querySelector("h4").textContent.trim();
        const schedule = scheduleData[doctorName] || ["Schedule not available"];
        scheduleList.innerHTML = "";
        schedule.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          scheduleList.appendChild(li);
        });
        modal.style.display = "block";
      });
    });

    closeModalBtn.onclick = () => {
      modal.style.display = "none";
    };

    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };
  };

  // ====================== Carousel ======================
  const initDoctorCarousel = () => {
    const scrollContainer = document.querySelector('.doctor-scroll');
    if (!scrollContainer) return;

    const leftBtn = document.querySelector('.doctor-left');
    const rightBtn = document.querySelector('.doctor-right');
    const doctorSection = document.querySelector('.doctors');
    let autoScrollInterval;
    let isScrolling = false;

    const getScrollAmount = () => {
      const firstCard = scrollContainer.querySelector('.doctor-card');
      return firstCard ? firstCard.offsetWidth + parseInt(window.getComputedStyle(scrollContainer).gap) : 245;
    };

    const scrollToPosition = (position, behavior = 'smooth') => {
      isScrolling = true;
      scrollContainer.scrollTo({ left: position, behavior });
      setTimeout(() => { isScrolling = false; }, 500);
    };

    const scrollByAmount = (amount) => {
      if (isScrolling) return;
      const newPosition = scrollContainer.scrollLeft + amount;
      scrollToPosition(newPosition);
    };

    const isAtEnd = () => scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth - 10;

    const startAutoScroll = () => {
      stopAutoScroll();
      autoScrollInterval = setInterval(() => {
        if (isAtEnd()) scrollToPosition(0, 'smooth');
        else scrollByAmount(getScrollAmount());
      }, 3000);
    };

    const stopAutoScroll = () => clearInterval(autoScrollInterval);

    leftBtn && leftBtn.addEventListener('click', () => scrollByAmount(-getScrollAmount()));
    rightBtn && rightBtn.addEventListener('click', () => scrollByAmount(getScrollAmount()));

    doctorSection.addEventListener('mouseenter', stopAutoScroll);
    doctorSection.addEventListener('mouseleave', startAutoScroll);
    doctorSection.addEventListener('touchstart', stopAutoScroll);
    doctorSection.addEventListener('touchend', startAutoScroll);

    startAutoScroll();
    window.addEventListener('resize', () => {
      if (!isScrolling) startAutoScroll();
    });
  };

  // ====================== Department Scroll ======================
  const initDepartmentScroll = () => {
    const deptScroll = document.getElementById('dept-scroll');
    if (!deptScroll) return;

    let isDown = false, startX, scrollLeft;

    deptScroll.addEventListener('mousedown', e => {
      isDown = true;
      deptScroll.style.cursor = 'grabbing';
      startX = e.pageX - deptScroll.offsetLeft;
      scrollLeft = deptScroll.scrollLeft;
    });

    deptScroll.addEventListener('mouseleave', () => {
      isDown = false;
      deptScroll.style.cursor = 'grab';
    });

    deptScroll.addEventListener('mouseup', () => {
      isDown = false;
      deptScroll.style.cursor = 'grab';
    });

    deptScroll.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - deptScroll.offsetLeft;
      const walk = (x - startX) * 2;
      deptScroll.scrollLeft = scrollLeft - walk;
    });

    deptScroll.addEventListener('touchstart', e => {
      isDown = true;
      startX = e.touches[0].pageX - deptScroll.offsetLeft;
      scrollLeft = deptScroll.scrollLeft;
    });

    deptScroll.addEventListener('touchend', () => {
      isDown = false;
    });

    deptScroll.addEventListener('touchmove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - deptScroll.offsetLeft;
      const walk = (x - startX) * 2;
      deptScroll.scrollLeft = scrollLeft - walk;
    });
  };

  // ====================== Smooth Scrolling ======================
  const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      });
    });
  };

  // ====================== Card Hover Effects ======================
  const initCardHoverEffects = () => {
    const cards = document.querySelectorAll('.card, .doctor-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  };

  // ====================== Init All ======================
  const initAll = () => {
    initMenu();
    initDoctorCarousel();
    initDepartmentScroll();
    initSmoothScrolling();
    initCardHoverEffects();
    initDoctorModal(); // ✅ এখানে নতুন মডাল ফাংশনটি যুক্ত হয়েছে
    console.log('Uttara Hospital website initialized');
  };

  initAll();
});
