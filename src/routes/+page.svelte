<script>
  import {
    ArrowCircleRight,
    Bookmark,
    Bookmarks,
    BookOpen,
    Books,
    CirclesThree,
    Crosshair,
    Gear,
    MagnifyingGlass,
    SlidersHorizontal,
    TextAa,
  } from "phosphor-svelte";

  import logo from "$lib/images/FOCAL-ES-rounded.svg";
</script>

<div class="space-y-10 mt-10">
  <div
    class="flex flex-row items-center text-6xl xl:text-7xl font-semibold font-title text-main mb-10"
  >
    <img class="mr-5" src={logo} width="70" alt="focal-es logo" />
    <div class="">FOCAL-ES</div>
  </div>

  <div class="text-justify space-y-20 xl:w-1/2">
    <p class="text-lg">
      <span class="text-main font-title text-lg">FOCAL-ES</span> es una base de datos
      cuyo objetivo es recabar muestras de lengua que ilustran el uso real de las
      partículas focales del español y ponerlas a disposición de los estudiosos de
      la gramática de nuestra lengua ―así como de otras personas potencialmente interesadas―
      por medio de una herramienta en línea, que queremos que sea intuitiva y de
      fácil manejo.
    </p>

    <!-- <img src={screenShot} alt="Screenshot of FOCAL-ES search tab" /> -->

    <div>
      <div
        class="flex flex-row items-center font-title text-main text-2xl mb-5 border-b border-main-lighter"
      >
        <span class="mr-3">
          <Books weight="duotone" />
        </span>
        <h1>Contenido</h1>
      </div>
      <p>
        En su versión actual, reúne más de 1400 ejemplos de uso de lo que la
        <b>Nueva Gramática de la Lengua Española (cf. RAE y ASALE 2009: 2992)</b
        >
        denomina adverbios de foco de inclusión, que se corresponden en buena medida
        con las unidades que en otros contextos académicos suelen recibir la etiqueta
        de partículas focales aditivas (cf. Sudhoff 2010: 53). Tales ejemplos han
        sido extraídos de textos procedentes de España y que figuran en el CORPES
        XXI, un corpus de referencia ―mantenido por la Real Academia Española desde
        2013― que se circunscribe al español del siglo XXI.
      </p>
    </div>

    <div>
      <div
        class="flex flex-row items-center font-title text-main text-2xl mb-5 border-b border-main-lighter"
      >
        <span class="mr-3">
          <SlidersHorizontal weight="duotone" />
        </span>
        <h1>Filtros</h1>
      </div>
      La aplicación de búsqueda de FOCAL-ES cuenta con los siguientes filtros:
      <ul class="list-inside lg:ml-10 space-y-5 my-3">
        <li>
          <span class="flex flex-row items-center space-x-3 text-main">
            <CirclesThree /> <b>Partícula</b></span
          > Permite seleccionar la partícula focal concreta.
        </li>
        <li>
          <span class="flex flex-row items-center space-x-3 text-main">
            <BookOpen /> <b>Medio</b></span
          >
          Distingue si el ejemplo procede de la lengua oral o de la lengua escrita.
        </li>
        <li>
          <span class="flex flex-row items-center space-x-3 text-main">
            <Crosshair /> <b>Elemento focalizado</b></span
          > Selecciona el tipo de constituyente que es identificado como foco gracias
          a la acción de la partícula focal. Cuando el ejemplo es ambiguo o el contexto
          no es suficiente como para identificar de modo concluyente la unidad lingüística
          focalizada, se marca como dudoso.
        </li>
        <li>
          <span class="flex flex-row items-center space-x-3 text-main">
            <ArrowCircleRight /> <b>Dirección</b></span
          > Distingue entre derecha e izquierda, en función de que la partícula focal
          vaya antepuesta o pospuesta al elemento focalizado. Cuando no se puede
          identificar de modo concluyente la dirección, se ha marcado como dudoso.
        </li>
        <li>
          <span class="flex flex-row items-center space-x-3 text-main">
            <TextAa /> <b>Palabra(s)</b></span
          > Permite buscar, de entre el listado total de ejemplos, aquellos que contengan
          una determinada palabra o serie de palabras. Dado que, en la versión actual,
          todos los ejemplos proceden del español contemporáneo europeo, no se incluyen
          filtros de selección diatópica ni de selección diacrónica.
        </li>
      </ul>
    </div>

    <div>
      <div
        class="flex flex-row items-center font-title text-main text-2xl mb-5 border-b border-main-lighter"
      >
        <span class="mr-3">
          <MagnifyingGlass weight="duotone" />
        </span>
        <h1>Equipo Investigador</h1>
      </div>

      <p>
        FOCAL-ES es un resultado derivado del proyecto de investigación
        FEDER-UJA Partículas focales del español (I): caracterización y
        elaboración de una base de datos de referencia (Código de referencia:
        <span class="font-mono">1380988</span>), activo en el bienio 2021-2022 y
        financiado por la Universidad de Jaén dentro de la convocatoria
        correspondiente a 2020 de ayudas a proyectos de I+D+i en el marco del
        Programa Operativo FEDER Andalucía 2014-2020.
      </p>

      <br />

      <p>
        El investigador principal del proyecto fue <b>Ventura Salazar García</b
        >. El equipo investigador estaba compuesto también por
        <b>Carmen Conti Jiménez</b>,
        <b>Elena Felíu Arquiola</b>, <b>Francisco Fernández García</b> y
        <b>Francisco Pedro Pla Colomer</b>. Todos ellos son profesores del
        Departamento de Filología Española de la Universidad de Jaén y miembros
        del Grupo de Investigación Análisis Lingüístico: Teoría y Aplicaciones
        (ALTYA), grupo HUM-834 del Plan Andaluz de Investigación, Desarrollo e
        Innovación, cuya responsable actual es Carmen Conti Jiménez.
      </p>

      <br />

      <p>
        También se contó con un equipo colaborador formado por <b
          >Valeria Belloro</b
        >
        (Universidad Autónoma de Querétaro, México), <b> Abigail Carretero</b>
        (Universidad Autónoma del Estado de Hidalgo en Pachuca, México),
        <b> Laura de la Casa Gómez </b>
        (Universidad de Jaén),
        <b> Carmen Chica Jurado </b>
        (egresada de la Universidad de Jaén),
        <b> Lilián Guerrero </b>
        (Universidad Nacional Autónoma de México) y
        <b> Enrique Pato </b>
        (Universidad de Montreal, Canadá). Para la recopilación de ejemplos se contó
        también con la inestimable ayuda de
        <b> Vilmos Nagy </b>
        (egresado de la Universidad de Jaén) durante el período del año 2022 en el
        que llevó a cabo prácticas extracurriculares Ícaro bajo la supervisión de
        Elena Felíu Arquiola.
      </p>
    </div>

    <div>
      <div
        class="flex flex-row items-center font-title text-main text-2xl mb-5 border-b border-main-lighter"
      >
        <span class="mr-3">
          <Gear weight="duotone" />
        </span>
        <h1>Equipo técnico</h1>
      </div>
      <p>
        El desarrollo técnico de la aplicación ha corrido a cargo de <b
          >Jesús Rascón</b
        >. La aplicación se ha desarrollado utilizando herramientas de código
        abierto como
        <a class="text-main underline" href="https://kit.svelte.dev/">Svelte</a>
        y utilizando servicios de última generación como
        <a class="text-main underline" href="https://vercel.com/">Vercel</a>
        para el despliegue y publicación de la misma. El código fuente está disponible
        en el
        <a
          class="text-main underline"
          href="https://github.com/jesi-rgb/focal-es"
        >
          repositorio en GitHub</a
        >.
      </p>
    </div>

    <div>
      <div
        class="flex flex-row items-center font-title text-main text-2xl mb-5 border-b border-main-lighter"
      >
        <span class="mr-3">
          <Bookmarks weight="duotone" />
        </span>
        <h1>Contenido</h1>
      </div>

      <ul class="space-y-4 italic opacity-60">
        <li>
          RAE y ASALE [Real Academia Española y Asociación de Academias de la
          Lengua Española] (2009).
        </li>

        <li>
          Nueva Gramática de la Lengua Española. Madrid: Espasa. Sudhoff, Stefan
          (2010).
        </li>
        <li>
          Focus Particles in German: Syntax, Prosody, and Information Structure.
          Ámsterdam: John Benjamins.
        </li>
      </ul>
    </div>
  </div>
</div>
