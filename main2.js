// Fetch jobs from output.json
fetch('output.json')
    .then(response => response.json())
    .then(data => {
        const jobList = document.getElementById('job-list');

        // Create container for job list
        const jobListContainer = document.createElement('div');
        jobListContainer.id = 'job-list-container';

        // Create list container
        const listContainer = document.createElement('div');
        listContainer.classList.add('list-container');

        data.forEach(job => {
        // Create a link element for the job
        const jobLink = document.createElement('a');
        jobLink.href = job.jobInternal_url;
        
        // Create a container for each job
        const jobContainer = document.createElement('div');
        jobContainer.classList.add('job-container');
        jobContainer.style.transition = 'transform 0.3s ease-in-out'; // Add transition effect
        jobContainer.style.cursor = 'pointer'; // Change cursor on hover
        jobContainer.style.transform = 'scale(1)'; // Initial scale
        jobContainer.addEventListener('mouseover', () => {
            jobContainer.style.transform = 'scale(1.05)'; // Scale up on hover
            jobContainer.style.backgroundColor = '#faf7ef'; // Change background color on hover
        });
        jobContainer.addEventListener('mouseout', () => {
            jobContainer.style.transform = 'scale(1)'; // Scale down on hover out
            jobContainer.style.backgroundColor = ''; // Revert back to original background color
        });

        // Create a parent container for image and details
        const imageAndDetailsContainer = document.createElement('div');
        imageAndDetailsContainer.classList.add('image-details-container');

            // Create image container
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

                // Create image element for the job
                const jobImage = document.createElement('img');
                jobImage.src = job.logo_url;
                jobImage.alt = 'Job Image';
                jobImage.classList.add('img-style');
                imageContainer.appendChild(jobImage);

            // Create details container
            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('details-container');

                // Create title element
                const jobTitleLink = document.createElement('a');
                const jobTitle = document.createElement('h3');
                jobTitleLink.textContent = job.jobTitle;
                jobTitleLink.href = job.jobInternal_url;
                jobTitle.classList.add('title-style');
                jobTitle.appendChild(jobTitleLink);
                detailsContainer.appendChild(jobTitle);

                // Check if the job is featured
                if (job.jobFeatured === 1) {
                    const featuredPill = document.createElement('span');
                    featuredPill.textContent = 'Featured';
                    featuredPill.classList.add('featured-pill'); // Add a CSS class to style the featured pill
                    jobTitle.appendChild(featuredPill); // Append the featured pill to the title cell
                }

                // Create category element
                const jobCategory = document.createElement('div');
                jobCategory.textContent = job.jobBusiness + '  • ' + job.jobLocation + '  • ' + job.jobType;
                jobCategory.style.lineHeight = '32px';
                jobCategory.style.fontSize = '14px';
                jobCategory.style.color = '#0b0c13b3'
                detailsContainer.appendChild(jobCategory);

            // Create button container
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

                // Create button element
                const savebutton = document.createElement('div');
                savebutton.textContent = 'Save';
                savebutton.classList.add('save-button-style');
                buttonContainer.appendChild(savebutton);

                // Create button element
                const applybutton = document.createElement('div');
                applybutton.textContent = 'View job';
                applybutton.classList.add('apply-button-style');
                buttonContainer.appendChild(applybutton);

                // Create a link element for the button
                const applyLink = document.createElement('a');
                applyLink.href = job.jobInternal_url; // Link the button to the jobInternal_url
                applyLink.appendChild(applybutton); // Append the button to the link

                // Append the link to the button container
                buttonContainer.appendChild(applyLink);

        // Append image container and details container to the parent container
        imageAndDetailsContainer.appendChild(imageContainer);
        imageAndDetailsContainer.appendChild(detailsContainer);
        imageAndDetailsContainer.appendChild(buttonContainer);

        // Append the parent container to job container
        jobContainer.appendChild(imageAndDetailsContainer);

            // Create other container
            const otherContainer = document.createElement('div');
            otherContainer.classList.add('other-container');

                // Check if the job is hybrid
                if (job.jobHybrid === 1) {
                    const jobHybrid = document.createElement('span');
                    jobHybrid.textContent = 'Hybrid';
                    jobHybrid.classList.add('hybrid-pill'); // Add a CSS class to style the featured pill
                    otherContainer.appendChild(jobHybrid); // Append the featured pill to the title cell
                }

                // Create category element
                const jobType = document.createElement('div');
                jobType.classList.add('category-pill');
                jobType.textContent = job.jobCategory;
                otherContainer.appendChild(jobType);

                // Create level element
                const jobLevel = document.createElement('div');
                jobLevel.classList.add('category-pill');
                jobLevel.textContent = job.jobLevel;
                otherContainer.appendChild(jobLevel);

                // Create business category element
                const jobBusinessCategory = document.createElement('div');
                jobBusinessCategory.classList.add('category-pill');
                jobBusinessCategory.textContent = job.jobBusinessCategory;
                otherContainer.appendChild(jobBusinessCategory);

            // Append image container and details container to job container
            jobContainer.appendChild(otherContainer);

            // Wrap job container with job link
            jobLink.appendChild(jobContainer);
            jobLink.style.textDecoration = 'none'; // Add text decoration none to the jobLink

            // Append job link to list container
            listContainer.appendChild(jobLink);
        });

        // Append list container to job list container
        jobListContainer.appendChild(listContainer);

        // Append job list container to the document body or a specific element
        document.body.appendChild(jobListContainer);

    })
    .catch(error => console.error('Error:', error));