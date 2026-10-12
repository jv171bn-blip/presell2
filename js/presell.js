/**
 * PRESELL DEVICE DETECTOR & INSTANT REDIRECT ENGINE
 * Preserva UTMs e parâmetros de rastreamento (Google, Facebook, TikTok Ads, etc.)
 * Previne loops e redireciona sem atrasos artificiais.
 */

(function () {
  'use strict';

  // Permitir inspeção/teste via parâmetro ?preview=1 ou ?noredirect=1
  try {
    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('preview') === '1' || searchParams.get('noredirect') === '1') {
      console.log('[Presell] Modo de pré-visualização ativo. Redirecionamento suspenso.');
      return;
    }
  } catch (e) {
    // Silently continue em navegadores antigos
  }

  // 1. URLs de Destino Oficiais
  var URL_MOBILE_TABLET = 'https://portalfarmabrasil.site';
  var URL_DESKTOP = 'https://rederaiasp.com.br';

  // 2. Detecção de Dispositivo (Mobile, Tablet vs Desktop)
  function isMobileOrTabletDevice() {
    try {
      // 2.1. Client Hints moderno (navigator.userAgentData)
      if (
        typeof navigator !== 'undefined' &&
        navigator.userAgentData &&
        typeof navigator.userAgentData.mobile === 'boolean'
      ) {
        if (navigator.userAgentData.mobile) {
          return true;
        }
      }

      // 2.2. User Agent completo
      var ua = (
        (typeof navigator !== 'undefined' && navigator.userAgent) ||
        (typeof navigator !== 'undefined' && navigator.vendor) ||
        (typeof window !== 'undefined' && window.opera) ||
        ''
      ).toLowerCase();

      var mobileRegex =
        /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet|kindle|silk|puffin|fennec|up\.browser/i;
      if (mobileRegex.test(ua)) {
        return true;
      }

      // 2.3. iPadOS 13+ (iPad que se identifica como MacIntel mas possui tela sensível ao toque)
      var isIPadOS =
        typeof navigator !== 'undefined' &&
        (navigator.platform === 'MacIntel' || ua.indexOf('macintosh') > -1) &&
        navigator.maxTouchPoints > 1;

      if (isIPadOS) {
        return true;
      }

      // 2.4. Fallback de tela e suporte a touch para navegadores limitados
      if (typeof window !== 'undefined') {
        var hasTouch =
          'ontouchstart' in window ||
          (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
        var isNarrowViewport = window.innerWidth > 0 && window.innerWidth <= 1024;
        if (hasTouch && isNarrowViewport) {
          return true;
        }
      }

      return false;
    } catch (err) {
      // Em caso de erro na detecção, assume Desktop por segurança
      return false;
    }
  }

  // 3. Montagem da URL de Destino com Preservação de UTMs
  function buildDestinationUrl(isMobileOrTablet) {
    var base = isMobileOrTablet ? URL_MOBILE_TABLET : URL_DESKTOP;
    var search = window.location.search || '';
    var hash = window.location.hash || '';

    var finalUrl = base;

    // Preservar todos os parâmetros de rastreamento (utm_source, gclid, fbclid, etc.)
    if (search && search.length > 1) {
      var separator = finalUrl.indexOf('?') > -1 ? '&' : '?';
      // Remove o primeiro '?' do search se necessário para evitar duplicação
      var cleanSearch = search.charAt(0) === '?' ? search.substring(1) : search;
      finalUrl += separator + cleanSearch;
    }

    if (hash) {
      finalUrl += hash;
    }

    return finalUrl;
  }

  // 4. Execução Imediata do Redirecionamento
  try {
    var isMobileOrTablet = isMobileOrTabletDevice();
    var destination = buildDestinationUrl(isMobileOrTablet);

    // Proteção contra loops infinitos caso a página já seja o destino
    var currentOrigin = window.location.origin.toLowerCase();
    var targetOrigin = (
      isMobileOrTablet ? URL_MOBILE_TABLET : URL_DESKTOP
    ).toLowerCase();

    if (currentOrigin === targetOrigin) {
      return;
    }

    // window.location.replace não salva a presell no histórico de navegação
    window.location.replace(destination);
  } catch (error) {
    // Fallback de contingência
    try {
      window.location.href = URL_DESKTOP + (window.location.search || '');
    } catch (e) {
      // Ignora falhas extremas
    }
  }
})();
