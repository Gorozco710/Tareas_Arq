import './App.css'

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="Infra deploy inicio">
          <span className="wordmark-mark" aria-hidden="true">I</span>
          <span>infra<span className="wordmark-light">/deploy</span></span>
        </a>
        <span className="branch-label"><span className="branch-dot" />HW-04 · Production</span>
      </header>

      <section className="overview" aria-labelledby="page-title">
        <p className="eyebrow">PIPELINE DE ENTREGA · AWS</p>
        <h1 id="page-title">Tu aplicación, <span>ya está en la nube.</span></h1>
        <p className="intro">
          Esta aplicación está desplegada en AWS S3 + CloudFront mediante
          GitHub Actions. Cada actualización de la rama <code>hw-04</code>
          compila y publica el sitio automáticamente.
        </p>
        <div className="deployment-status">
          <span className="status-check" aria-hidden="true">✓</span>
          <div>
            <strong>Despliegue listo</strong>
            <span>Contenido servido desde una distribución global</span>
          </div>
          <span className="status-tag">ACTIVO</span>
        </div>
      </section>

      <section className="pipeline" aria-labelledby="pipeline-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">AUTOMATIZACIÓN</p>
            <h2 id="pipeline-title">Del commit al CDN</h2>
          </div>
          <span className="workflow-file">.github/workflows/deploy.yml</span>
        </div>
        <ol className="pipeline-list">
          <li>
            <span className="step-number">01</span>
            <span className="step-indicator" aria-hidden="true">✓</span>
            <div><strong>Build</strong><span>Vite genera los archivos estáticos en <code>dist/</code></span></div>
            <span className="step-state">COMPLETADO</span>
          </li>
          <li>
            <span className="step-number">02</span>
            <span className="step-indicator" aria-hidden="true">✓</span>
            <div><strong>Upload</strong><span>Los archivos se sincronizan con el bucket S3</span></div>
            <span className="step-state">COMPLETADO</span>
          </li>
          <li>
            <span className="step-number">03</span>
            <span className="step-indicator" aria-hidden="true">✓</span>
            <div><strong>Invalidate</strong><span>CloudFront actualiza la caché de la distribución</span></div>
            <span className="step-state">COMPLETADO</span>
          </li>
        </ol>
      </section>

      <footer className="page-footer">
        <span>REACT · VITE · AWS</span>
        <span>Despliegue continuo desde GitHub Actions</span>
      </footer>
    </main>
  )
}

export default App
