/**
 * INTERAÇÕES DAS PÁGINAS INSTITUCIONAIS E ÁREA DO CLIENTE
 * Inclui validações, feedback visual, scroll suave e simulação de erros.
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Botão Voltar ao Topo
  var backToTopBtn = document.getElementById('footer-back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Card Baixar Aplicativo (Toast feedback)
  var downloadAppCard = document.getElementById('footer-download-app');
  if (downloadAppCard) {
    downloadAppCard.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Aplicativo Droga Raia: Disponível em breve na Google Play e App Store!');
    });
  }

  // 3. Minha Conta - Toggle Senha e Submit
  var togglePwdBtn = document.getElementById('inst-toggle-pwd-btn');
  var pwdInput = document.getElementById('inst-password');
  if (togglePwdBtn && pwdInput) {
    togglePwdBtn.addEventListener('click', function () {
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        togglePwdBtn.innerHTML =
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
      } else {
        pwdInput.type = 'password';
        togglePwdBtn.innerHTML =
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
      }
    });
  }

  var accountForm = document.getElementById('form-minha-conta-element');
  var accountBanner = document.getElementById('account-error-banner');
  var accountSubmitBtn = document.getElementById('btn-entrar-conta');
  if (accountForm && accountBanner && accountSubmitBtn) {
    accountForm.addEventListener('submit', function (e) {
      e.preventDefault();
      accountSubmitBtn.disabled = true;
      accountSubmitBtn.textContent = 'AUTENTICANDO...';

      setTimeout(function () {
        accountSubmitBtn.disabled = false;
        accountSubmitBtn.textContent = 'ENTRAR NA CONTA';
        accountBanner.style.display = 'flex';
        accountBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 600);
    });
  }

  // 4. Carrinho - Calcular Frete e Finalizar Compra
  var cartCepForm = document.getElementById('inst-cart-cep-form');
  var cartBanner = document.getElementById('cart-error-banner');
  var cartFinalizarBtn = document.getElementById('btn-finalizar-carrinho');

  function triggerCartError(e) {
    if (e) e.preventDefault();
    if (cartBanner) {
      if (cartFinalizarBtn) {
        cartFinalizarBtn.disabled = true;
        cartFinalizarBtn.textContent = 'PROCESSANDO...';
      }
      setTimeout(function () {
        if (cartFinalizarBtn) {
          cartFinalizarBtn.disabled = false;
          cartFinalizarBtn.textContent = 'FINALIZAR COMPRA';
        }
        cartBanner.style.display = 'flex';
        cartBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 600);
    }
  }

  if (cartCepForm) {
    cartCepForm.addEventListener('submit', triggerCartError);
  }
  if (cartFinalizarBtn) {
    cartFinalizarBtn.addEventListener('click', triggerCartError);
  }

  // 5. Lista de Desejos - Submit
  var wishForm = document.getElementById('inst-wish-form');
  var wishBanner = document.getElementById('wish-error-banner');
  var wishSubmitBtn = document.getElementById('btn-adicionar-desejos');
  if (wishForm && wishBanner && wishSubmitBtn) {
    wishForm.addEventListener('submit', function (e) {
      e.preventDefault();
      wishSubmitBtn.disabled = true;
      wishSubmitBtn.textContent = 'SALVANDO...';

      setTimeout(function () {
        wishSubmitBtn.disabled = false;
        wishSubmitBtn.textContent = 'ADICIONAR À LISTA';
        wishBanner.style.display = 'flex';
        wishBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 600);
    });
  }

  // 6. Meus Pedidos - Submit
  var orderForm = document.getElementById('inst-order-form');
  var orderBanner = document.getElementById('order-error-banner');
  var orderSubmitBtn = document.getElementById('btn-rastrear-pedido');
  if (orderForm && orderBanner && orderSubmitBtn) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      orderSubmitBtn.disabled = true;
      orderSubmitBtn.textContent = 'LOCALIZANDO...';

      setTimeout(function () {
        orderSubmitBtn.disabled = false;
        orderSubmitBtn.textContent = 'CONSULTAR PEDIDO';
        orderBanner.style.display = 'flex';
        orderBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 600);
    });
  }

  // 7. Página Obrigado - Abrir campo de rastreio e consultar status
  var btnAbrirRastreio = document.getElementById('btn-abrir-rastreio');
  var trackingReveal = document.getElementById('obrigado-tracking-reveal');
  var inputCodigo = document.getElementById('obrigado-input-codigo');
  var formTracking = document.getElementById('form-consultar-rastreio');
  var btnConsultar = document.getElementById('btn-consultar-rastreio');
  var timelineBox = document.getElementById('obrigado-timeline');
  var timelineCode = document.getElementById('obrigado-timeline-code-display');

  if (btnAbrirRastreio && trackingReveal) {
    btnAbrirRastreio.addEventListener('click', function (e) {
      e.preventDefault();
      trackingReveal.style.display = 'block';
      if (inputCodigo) {
        inputCodigo.focus();
      }
      trackingReveal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  if (formTracking && btnConsultar && timelineBox) {
    formTracking.addEventListener('submit', function (e) {
      e.preventDefault();
      var code = inputCodigo ? inputCodigo.value.trim().toUpperCase() : 'RD-894721';
      if (!code) code = 'RD-894721';

      btnConsultar.disabled = true;
      btnConsultar.textContent = 'CONSULTANDO...';

      setTimeout(function () {
        btnConsultar.disabled = false;
        btnConsultar.textContent = 'CONSULTAR';
        if (timelineCode) {
          timelineCode.textContent = code;
        }
        timelineBox.style.display = 'block';
        timelineBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 500);
    });
  }
});

