import './globals.css'

export default function Home() {
  return (
    <div className="container">
      <div className="left-column">
        <h2 className="welcome-heading">Bem-vindo ao <span className="brand-name">CinemApp</span></h2>
        <p className="description">Um aplicativo para controle de cinema</p>
      </div>
      <div className="right-column">
        <img className="cinem-logo" src="/cinem.png" alt="Cinem Logo" />
      </div>
    </div>
  )
}