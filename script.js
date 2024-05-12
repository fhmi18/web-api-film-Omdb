//Membuat Fitur search 
// $('.search-button').on('click',function(){
//     $.ajax({
//         url : 'http://www.omdbapi.com/?apikey=4f5c79c&s=' + $('.input-keyword').val(),
//         success: result =>{
//             const movie = result.Search;
//             let cards = '';
//             movie.forEach( m => {
//                 cards += showcard(m);
//             });
//             $('.movie-container').html(cards);
//             //ketika tombol diklik
//             $('.modal-detail-button').on('click',function () {
//                 $.ajax({
//                     url:'http://www.omdbapi.com/?apikey=4f5c79c&i=' + $(this).data('imdbid'),
//                     success: m=>{
//                         const movieDetail = showDetail(m);
//                       $('.modal-body').html(movieDetail);
//                     },
//                     error: (e)=>{
//                         console.log(e.responseText);
//                     }
//                 });
//             });
//         },
//         error: (e)=>{
//             console.log(e.responseText);
//         }
//     });
// });

// Tanpa Fitur Search
// $.ajax({
//     url : 'http://www.omdbapi.com/?apikey=4f5c79c&s=avenger',
//     success: result =>{
//         const movie = result.Search;
//         let cards = '';
//         movie.forEach( m => {
//             cards += showcard(m);
//         });
//         $('.movie-container').html(cards);
//         //ketika tombol diklik
//         $('.modal-detail-button').on('click',function () {
//             $.ajax({
//                 url:'http://www.omdbapi.com/?apikey=4f5c79c&i=' + $(this).data('imdbid'),
//                 success: m=>{
//                     const movieDetail = showDetail(m);
//                   $('.modal-body').html(movieDetail);
//                 },
//                 error: (e)=>{
//                     console.log(e.responseText);
//                 }
//             });
//         });
//     },
//     error: (e)=>{
//         console.log(e.responseText);
//     }
// });  


const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function(){
  const inputKeyword = document.querySelector('.input-keyword');
  const key = inputKeyword.value;
  inputKeyword.dataset.imdbid = key;
  const imdbid = inputKeyword.dataset.imdbid;
  fetch('http://www.omdbapi.com/?apikey=4f5c79c&s=' + imdbid)
  .then(Response => Response.json())
  .then(Response => {
    const movie = Response.Search;
    let card ='';
    movie.forEach(m => {
      card += showcard(m);
    });
    const movieUI= document.querySelector('.movie-container');
    movieUI.innerHTML = card;

    const modalDetail = document.querySelectorAll('.modal-detail-button');
    modalDetail.forEach(button =>{
      button.addEventListener('click', function(){
        const imdbid = button.dataset.imdbid; 
        fetch('http://www.omdbapi.com/?apikey=4f5c79c&i=' + imdbid)
        .then(Response =>Response.json())
        .then(m =>{
          // console.log(m);
          let detailCard = '';
          const movieDetail = detailCard + showDetail(m);
          // console.log(movieDetail);
          const modalBody = document.querySelector('.modal-body');
          modalBody.innerHTML = movieDetail;
        });
      });
    })
  });
});

// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function(){
//   const inputKeyword = document.querySelector('.input-keyword');
//   const keyword = inputKeyword.value.trim(); // Ambil nilai input dan hapus spasi ekstra jika ada
//   if (keyword === '') {
//     // Jika input kosong, tangani dengan memberikan pesan kepada pengguna atau melakukan tindakan yang sesuai
//     console.log('Input keyword kosong');
//     return; // Hentikan eksekusi jika input kosong
//   }
  
//   fetch('http://www.omdbapi.com/?apikey=4f5c79c&s=' + encodeURIComponent(keyword)) // Menggunakan encodeURIComponent untuk mengkodekan karakter khusus dalam URL
//   .then(Response => Response.json())
//   .then(Response => {
//     const movie = Response.Search;
//     let card ='';
//     movie.forEach(m => {
//       card += showcard(m);
//     });
//     const movieUI= document.querySelector('.movie-container');
//     movieUI.innerHTML = card;
//   });
// })


function showcard(m){
    return  `<div class="col-sm-4">
    <div class="card">
    <div class="card-body">
    <img class="card-img-top" src="${m.Poster}">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#moviedetailmodel" data-imdbid="${m.imdbID}">Show detail</a>
    </div>
    </div>
</div>`;
}

function showDetail(m) {
    return  `<div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${m.Poster}" class="img-fluid" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
          <li class="list-group-item"><strong>${m.Genre}</strong></li>
          <li class="list-group-item"><strong>${m.Released}</strong></li>
          <li class="list-group-item"><strong>${m.Actors}</strong></li>
          <li class="list-group-item">
            <strong>${m.Plot}</strong><br />
          </li>
        </ul>
      </div>
    </div>
  </div>`;
}