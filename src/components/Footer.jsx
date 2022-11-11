const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="col align-items-center">
          <p>
            © Walter Thumann, 2022. Esquema de colores basado en{" "}
            <a
              href="https://draculatheme.com/"
              target="_blank"
              rel="noreferrer"
            >
              Dracula
            </a>
            . Página construida usando componentes de{" "}
            <a
              href="https://chakra-ui.com/getting-started"
              target="_blank"
              rel="noreferrer"
            >
              Chakra UI
            </a>
          </p>
        </div>
        <div className="col justify-content-end">
          <a
            className="fs-5"
            href="https://github.com/batithumann"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
