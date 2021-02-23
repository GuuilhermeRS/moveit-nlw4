import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/71676332?s=460&u=1ac658aa200fe68842b1f74de3c070dcf0540746&v=4" alt="Guilherme Rodrigues" />
      <div>
        <strong>Guilherme Rodrigues</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1</p>
      </div>
    </div>
  )

  // os arquivos que ficam dentro da pasta public, são visiveis publicamente em todo o projeto, e colocando apenas icons/level.svg, ele entende que o caminhoe está na pasta public
}