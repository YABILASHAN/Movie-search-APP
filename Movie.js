
    let movieNameRef = document.getElementById("movie-name");
    let searchBtn = document.getElementById("Search-btn");
    let result = document.getElementById("result");
    

    const key = "YOUR_API_KEY"; 
    
    let getmovie = async () => {
        let movieName = movieNameRef.value.trim();
        let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    
        
        if (movieName.length <= 0) {
            result.innerHTML = `<h3 class="msg">Please Enter the Movie Name</h3>`;
            return;
        }
    
        try {
           
            const response = await fetch(url);
            const data = await response.json();
    
          
            if (data.Response === "True") {
                result.innerHTML = `
                    <div class="movie-details">
                        <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/150'}" alt="Movie Poster" class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class ="rating">
                            ⭐<h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                             <span>${data.Rated}</span>
                             <span>${data.Year}</span>
                             <span>${data.Runtime}</span>
                            </div>
                            <div class="info">
                             <div> ${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot: </h3>
                    <p>${data.Plot}</p>
                    <h3>Cast: </h3>
                    <p>${data.Actors}</p>
                `;

            } else {
               
                result.innerHTML = `<h3 class="msg">Movie Not Found</h3>`;
            }
        } catch (error) {
           
            result.innerHTML = `<h3 class="msg">An error occurred. Please try again later.</h3>`;
            console.error(error);
        }
    };
    
    searchBtn.addEventListener("click", getmovie);
    