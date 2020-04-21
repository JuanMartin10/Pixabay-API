import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {

  const [search, setSearch] = useState('')
  const [images, setImages] = useState([])
  const [actualpage, setActualPage] = useState(1)
  const [totalpages, setTotalPages] = useState(5)

  useEffect(() => {

    const getAPI = async () => {
      if (search === '') return

      const imagesPerPage = 30;
      const key = process.env.REACT_APP_APIKEY
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${actualpage}`;

      const response = await fetch(url)
      const result = await response.json()

      setImages(result.hits)

      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage)
      setTotalPages(calculateTotalPages)


      // Auto-Scroll según pulses el botón de siguiente
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({ behavior: 'smooth' })

    }
    getAPI()


  }, [search, actualpage])

  const previousPage = () => {
    const newActualPage = actualpage - 1

    if (newActualPage === 0) return
    setActualPage(newActualPage)
  }

  const nextPage = () => {
    const newActualPage = actualpage + 1

    if (newActualPage > totalpages) return

    setActualPage(newActualPage)

  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>

        <Formulario
          setSearch={setSearch}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes
          images={images}
        />

        {(actualpage === 1) ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={previousPage}
          > &laquo;Anterior
          </button>
        )}

        {(actualpage === totalpages) ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={nextPage}
          >Siguiente &raquo;</button>
        )}
      </div>
    </div>
  );
}

export default App;
