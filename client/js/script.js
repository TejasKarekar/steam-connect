document.addEventListener("DOMContentLoaded", () => {

  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active');

      navLinks.forEach((link, index) => {
          if (link.style.animation) {
              link.style.animation = '';
          } else {
              link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
          }
      });

      burger.classList.toggle('toggle');
  });  
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
    const donors = []
    const patients = []
    const educationalResources = {
      articles: [
        { title: "Understanding Stem Cell Donation", url: "#" },
        { title: "The Importance of HLA Matching", url: "#" },
        { title: "What to Expect During Donation", url: "#" },
      ],
      faqs: [
        {
          question: "Is stem cell donation painful?",
          answer: "The donation process is generally not painful, but you may experience some discomfort.",
        },
        {
          question: "How long does the donation process take?",
          answer:
            "The actual donation takes about 4-6 hours, but the entire process including preparation can take several weeks.",
        },
        {
          question: "Can I donate if I have a medical condition?",
          answer: "It depends on the condition. You'll need to consult with a healthcare professional.",
        },
      ],
      videos: [
        { title: "Stem Cell Donation: Step by Step", url: "#" },
        { title: "Patient Stories: Lives Changed by Donation", url: "#" },
        { title: "The Science Behind Stem Cell Transplants", url: "#" },
      ],
    }
  
    const donorForm = document.getElementById("donor-form")
    donorForm.addEventListener("submit", async (e) => {
      e.preventDefault()
  
      const formData = new FormData(donorForm)
      const donorData = Object.fromEntries(formData)
  
      const swabReport = formData.get("swabReport")
      if (swabReport && swabReport.type !== "application/pdf") {
        alert("Please upload a PDF file for the swab test report.")
        return
      }
  
      try {
        const response = await simulateServerRequest(donorData)
        if (response.success) {
          alert("Thank you for registering! Your information has been securely stored.")
          donorForm.reset()
          sendNotification("email", donorData.email, "donor_confirmation")
          sendNotification("email", "admin@stemconnect.com", "new_donor_alert")
        } else {
          alert("There was an error processing your registration. Please try again.")
        }
      } catch (error) {
        console.error("Error:", error)
        alert("An unexpected error occurred. Please try again later.")
      }
    })
  
    async function simulateServerRequest(data) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
  
      if (data.name && data.email && data.phone && data.medicalHistory && data.swabReport) {
        donors.push(data)
        console.log("Donor data stored in MySQL:", data)
        return { success: true }
      } else {
        return { success: false }
      }
    }

    function sendNotification(type, recipient, template) {
      console.log(`Sending ${type} notification to ${recipient} using template: ${template}`)
    }
  
    const swabReportInput = document.getElementById("swabReport")
    swabReportInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      const maxSizeInBytes = 5 * 1024 * 1024 
  
      if (file && file.size > maxSizeInBytes) {
        alert("File size exceeds 5MB. Please choose a smaller file.")
        e.target.value = "" 
      }
    })
  
    const stats = document.querySelectorAll(".stat-number")
    const observerOptions = {
      threshold: 0.5,
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = Number.parseInt(entry.target.getAttribute("data-target"))
          animateValue(entry.target, 0, target, 2000)
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
  
    stats.forEach((stat) => {
      observer.observe(stat)
    })
  
    function animateValue(obj, start, end, duration) {
      let startTimestamp = null
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        obj.innerHTML = Math.floor(progress * (end - start) + start)
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  
    function populateEducationalResources() {
      const articlesList = document.getElementById("articles-list")
      const faqsList = document.getElementById("faqs-list")
      const videosList = document.getElementById("videos-list")
  
      educationalResources.articles.forEach((article) => {
        const li = document.createElement("li")
        const a = document.createElement("a")
        a.href = article.url
        a.textContent = article.title
        li.appendChild(a)
        articlesList.appendChild(li)
      })
  
      educationalResources.faqs.forEach((faq) => {
        const li = document.createElement("li")
        li.textContent = faq.question
        li.title = faq.answer
        faqsList.appendChild(li)
      })
  
      educationalResources.videos.forEach((video) => {
        const li = document.createElement("li")
        const a = document.createElement("a")
        a.href = video.url
        a.textContent = video.title
        li.appendChild(a)
        videosList.appendChild(li)
      })
    }
  
    populateEducationalResources()
  
    const searchForm = document.getElementById("search-form")
    const searchResults = document.getElementById("search-results")
  
    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      const hlaType = searchForm.hlaType.value
      const matchingDonors = await searchDonors(hlaType)
      displaySearchResults(matchingDonors)
    })
  
    async function searchDonors(hlaType) {
    
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return donors.filter((donor) => donor.hlaType === hlaType)
    }
  
    function displaySearchResults(matchingDonors) {
      searchResults.innerHTML = ""
      if (matchingDonors.length === 0) {
        searchResults.innerHTML = "<p>No matching donors found.</p>"
        return
      }
      matchingDonors.forEach((donor) => {
        const donorCard = document.createElement("div")
        donorCard.className = "donor-card"
        donorCard.innerHTML = `
                  <h3>${donor.name}</h3>
                  <p>HLA Type: ${donor.hlaType}</p>
                  <button onclick="notifyMatch('${donor.email}')">Notify Match</button>
              `
        searchResults.appendChild(donorCard)
      })
    }
  
    window.notifyMatch = (donorEmail) => {
      sendNotification("email", donorEmail, "donor_match")
      alert("Donor has been notified of the potential match.")
    }
  
    
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChat = document.querySelector('.close-chat');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.querySelector('.chatbot-messages');

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.style.display = 'block';
        chatbotToggle.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
        chatbotToggle.style.display = 'flex';
    });

    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatbotInput.value = '';
            // Simulate AI response (replace with actual AI integration)
            setTimeout(() => {
                const aiResponse = getAIResponse(message);
                addMessage('ai', aiResponse);
            }, 1000);
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getAIResponse(message) {
        const responses = [
            "How can I assist you with stem cell donation?",
            "That's an interesting question about stem cells. Let me find some information for you.",
            "I'm here to help you understand the stem cell donation process. What would you like to know?",
            "Stem cell donation is a life-saving procedure. Can you tell me more about your concerns?",
            "I'd be happy to explain the benefits and risks of stem cell donation. What specific aspect are you curious about?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    const viewDonorsBtn = document.getElementById("view-donors")
    const approveDonorsBtn = document.getElementById("approve-donors")
    const viewPatientsBtn = document.getElementById("view-patients")
    const generateReportBtn = document.getElementById("generate-report")
    const adminContent = document.getElementById("admin-content")
  
    viewDonorsBtn.addEventListener("click", () => displayDonors())
    approveDonorsBtn.addEventListener("click", () => approveNewDonors())
    viewPatientsBtn.addEventListener("click", () => displayPatients())
    generateReportBtn.addEventListener("click", () => generateMatchingReport())
  
    function displayDonors() {
      adminContent.innerHTML = `
              <h3>Registered Donors</h3>
              <table class="admin-table">
                  <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>HLA Type</th>
                      <th>Actions</th>
                  </tr>
                  ${donors
                    .map(
                      (donor) => `
                      <tr>
                          <td>${donor.name}</td>
                          <td>${donor.email}</td>
                          <td>${donor.hlaType}</td>
                          <td>
                              <button onclick="editDonor('${donor.email}')">Edit</button>
                              <button onclick="deleteDonor('${donor.email}')">Delete</button>
                          </td>
                      </tr>
                  `,
                    )
                    .join("")}
              </table>
          `
    }
  
    function approveNewDonors() {
      const newDonors = donors.filter((donor) => !donor.approved)
      adminContent.innerHTML = `
              <h3>New Donor Applications</h3>
              <table class="admin-table">
                  <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>HLA Type</th>
                      <th>Actions</th>
                  </tr>
                  ${newDonors
                    .map(
                      (donor) => `
                      <tr>
                          <td>${donor.name}</td>
                          <td>${donor.email}</td>
                          <td>${donor.hlaType}</td>
                          <td>
                              <button onclick="approveDonor('${donor.email}')">Approve</button>
                              <button onclick="rejectDonor('${donor.email}')">Reject</button>
                          </td>
                      </tr>
                  `,
                    )
                    .join("")}
              </table>
          `
    }
  
    function displayPatients() {
      adminContent.innerHTML = `
              <h3>Registered Patients</h3>
              <table class="admin-table">
                  <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>HLA Type</th>
                      <th>Actions</th>
                  </tr>
                  ${patients
                    .map(
                      (patient) => `
                      <tr>
                          <td>${patient.name}</td>
                          <td>${patient.email}</td>
                          <td>${patient.hlaType}</td>
                          <td>
                              <button onclick="editPatient('${patient.email}')">Edit</button>
                              <button onclick="deletePatient('${patient.email}')">Delete</button>
                          </td>
                      </tr>
                  `,
                    )
                    .join("")}
              </table>
          `
    }
  
    function generateMatchingReport() {
      const matches = patients.map((patient) => {
        const matchingDonors = donors.filter((donor) => donor.hlaType === patient.hlaType)
        return { patient, matchingDonors }
      })
  
      adminContent.innerHTML = `
              <h3>Matching Report</h3>
              <table class="admin-table">
                  <tr>
                      <th>Patient</th>
                      <th>HLA Type</th>
                      <th>Matching Donors</th>
                  </tr>
                  ${matches
                    .map(
                      (match) => `
                      <tr>
                          <td>${match.patient.name}</td>
                          <td>${match.patient.hlaType}</td>
                          <td>${match.matchingDonors.length}</td>
                      </tr>
                  `,
                    )
                    .join("")}
              </table>
          `
    }
  
    window.editDonor = (email) => {
      console.log(`Editing donor: ${email}`)
    }
  
    window.deleteDonor = (email) => {
      console.log(`Deleting donor: ${email}`)
      donors.splice(
        donors.findIndex((donor) => donor.email === email),
        1,
      )
      displayDonors()
    }
  
    window.approveDonor = (email) => {
      console.log(`Approving donor: ${email}`)
      const donor = donors.find((donor) => donor.email === email)
      if (donor) {
        donor.approved = true
        sendNotification("email", donor.email, "donor_approved")
      }
      approveNewDonors()
    }
  
    window.rejectDonor = (email) => {
      console.log(`Rejecting donor: ${email}`)
      donors.splice(
        donors.findIndex((donor) => donor.email === email),
        1,
      )
      approveNewDonors()
    }
  
    window.editPatient = (email) => {
      console.log(`Editing patient: ${email}`)
    }
  
    window.deletePatient = (email) => {
      console.log(`Deleting patient: ${email}`)
      patients.splice(
        patients.findIndex((patient) => patient.email === email),
        1,
      )
      displayPatients()
    }
  })
  
  