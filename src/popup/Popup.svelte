<main>
  <h3>Whatsapp Speed Dial</h3>
  <div>Right click the phone number and press the speed dial action</div>
</main>

<style>
  :root {
    --green: #25d366;
  }

  :global(:root) {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;

    color-scheme: light dark;
    background-color: #242424;
  }

  :global(body) {
    min-width: 20rem;
    margin: 0;
  }

  :global(body) {
    min-width: 20rem;
    margin: 0;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    flex-direction: column;
    gap: 8px;
    display: flex;
  }
  
  textarea {
    min-width: 100%;
    min-height: 200px;
  }

  h3 {
    color: var(--green);
    text-transform: uppercase;
    font-weight: bold;
    margin: 0.5rem auto;
  }

  .calc {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & > button {
      font-size: 1rem;
      padding: 0.5rem 1rem;
      border: 1px solid var(--green);
      border-radius: 0.25rem;
      background-color: transparent;
      color: var(--green);
      cursor: pointer;
      outline: none;

      width: 3rem;
      margin: 0 a;
    }
  }

  a {
    font-size: 0.5rem;
    margin: 0.5rem;
    color: #cccccc;
    text-decoration: none;
  }
</style>
