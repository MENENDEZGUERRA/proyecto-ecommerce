import { asset } from "$fresh/runtime.ts";

export default function Header() {
  return (
    <header class="header">
      <div class="header-container">
        <div class="nav-section left-section">
          <a href="/productsPage" class="nav-link">Home</a>
        </div>
        
        <div class="center-section">
          <div class="title-container">
            <h1 class="title">El Bazar de Ulthar</h1>
            <div class="logo-container">
              <img 
                src={asset("/media/logo.svg")} 
                alt="Logo El Bazar de Ulthar" 
                class="logo"
              />
            </div>
          </div>
        </div>
        
        <div class="nav-section right-section">
          <a href="/bagPage" class="nav-link">Bag</a>
        </div>
      </div>
    </header>
  );
}