<script>
  import { onMount } from 'svelte'

  let variables = {}
  let templates = {}
  let template = ''
  let phone = ''

  $: isDisabled = template.length === 0
  $: {
    try {
      variables = (template.match(/{{(.*?)}}/g) ?? []).reduce((acc, v) => {
        const key = v.replace(/[{}]/g, '').trim()
        acc[key] = variables[key] || ''
        return acc
      }, {})
    } catch (err) {
      console.log('failed')
      console.error(err)
    }
  }

  const getTemplateKey = (text) => {
    if (!text) return ''
    return text.slice(0, 16) + '...'
  }

  const onPressSend = () => {
    // Replace variables using js instead of handlebars
    const text = template.replace(/{{(.*?)}}/g, (_, key) => variables[key])
    const cellphone = phone.replace(/[^0-9]/g, '')
    const url = `https://wa.me/${cellphone}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const onPressSave = async () => {
    const nextTemplates = { ...templates, [getTemplateKey(template)]: template }
    chrome.storage.sync.set({ templates: nextTemplates })
    templates = nextTemplates
  }

  const onPressDelete = async () => {
    const currentKey = getTemplateKey(template)
    const nextTemplates = Object.keys(templates).reduce((acc, key) => {
      if (key !== currentKey) {
        acc[key] = templates[key]
      }
      return acc
    }, {})

    chrome.storage.sync.set({ templates: nextTemplates })
    templates = nextTemplates
  }

  const onPressTemplate = (t) => {
    template = t
  }

  onMount(() => {
    chrome.storage.sync.get('phone', (data) => {
      phone = data?.phone?.trim?.() || ''
    })

    chrome.storage.sync.get('templates', (data) => {
      templates = data.templates || {}
      template = Object.values(templates)[0] || ''
    })

    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'sync' && changes.phone) {
        phone = changes?.phone?.newValue?.trim?.() ?? ''
      }
    })
  })
</script>

<main>
  <h3>Whatsapp Speed Dial</h3>

  <div class="calc">
    <div>
      <label>Template</label>
    </div>

    <div style="display:flex; gap: 8px;">
      {#each Object.values(templates) as t}
        <button on:click={() => onPressTemplate(t)}>{getTemplateKey(t)}</button>
      {/each}
    </div>

    <textarea bind:value={template} />
    <div style="display: flex; justify-content: flex-end; width: 100%; gap: 8px;">
      <button disabled={isDisabled} on:click={onPressSave}>Save +</button>
      <button disabled={isDisabled} on:click={onPressDelete}>Delete X</button>
    </div>
  </div>

  <label>Variables</label>
  <div style="display: flex; gap: 8px; flex-direction:column;">
    {#each Object.keys(variables) as k}
      <div style="display:flex;justify-content:space-between; gap: 8px;">
        <span>{k}</span>
        <input style="flex:1" type="text" bind:value={variables[k]} />
      </div>
    {/each}
  </div>

  {#if Object.keys(variables).length === 0}
    <p>{`No variables found, try something like hello {{name}}`}</p>
  {/if}

  <div style="border-top: 1px solid white; padding-top: 12px; margin-top: 6px; display: flex; gap: 8px;">
    <label>Phone</label>
    <input type="text" bind:value={phone} />
  </div>

  <div>
    <div on:click={onPressSend} style="background-color: var(--green); padding: 4px; cursor: pointer;user-select: none;">Send with WhatsApp</div>
  </div>
</main>

<style>
  :root {
    --green: #075E54
    ;
  }

  :global(:root) {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
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
    gap: 8px;
  }

  a {
    font-size: 0.5rem;
    margin: 0.5rem;
    color: #cccccc;
    text-decoration: none;
  }
</style>
