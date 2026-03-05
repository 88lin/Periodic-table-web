// === DOM 元素引用 ===
const table = document.getElementById('table');
const legend = document.getElementById('legend');
const modal = document.getElementById('modal');
const atomContainer = document.getElementById('atomContainer');
const expandedAtomModal = document.getElementById('expandedAtomModal');
const expandedAtomContainer = document.getElementById('expandedAtomContainer');

// === 模态框 DOM 元素缓存（在 init 后初始化）===
let modalElements = null;

function initModalElements() {
    modalElements = {
        // 标签页按钮
        tabBasic: document.getElementById('tab-basic'),
        tabPhysical: document.getElementById('tab-physical'),
        tabChemical: document.getElementById('tab-chemical'),
        tabHistory: document.getElementById('tab-history'),
        tabMedia: document.getElementById('tab-media'),
        
        // 头部信息
        symbol: document.getElementById('m-symbol'),
        name: document.getElementById('m-name'),
        enName: document.getElementById('m-en-name'),
        category: document.getElementById('m-cat'),
        phase: document.getElementById('m-phase'),
        block: document.getElementById('m-block'),
        
        // 简介
        summary: document.getElementById('m-summary'),
        summaryBox: document.getElementById('m-summary-box'),
        
        // 基础信息标签
        electronConfigLabel: document.getElementById('electron-config-label'),
        config: document.getElementById('m-config'),
        configSemantic: document.getElementById('m-config-semantic'),
        configShell: document.getElementById('m-config-shell'),
        
        valenceLabel: document.getElementById('valence-label'),
        valence: document.getElementById('m-valence'),
        
        isotopesLabel: document.getElementById('isotopes-label'),
        isotopes: document.getElementById('m-isotopes'),
        
        positionLabel: document.getElementById('position-label'),
        periodLabel: document.getElementById('period-label'),
        groupLabel: document.getElementById('group-label'),
        blockLabel: document.getElementById('block-label'),
        atomicNumLabel: document.getElementById('atomic-num-label'),
        period: document.getElementById('m-period'),
        group: document.getElementById('m-group'),
        blockVal: document.getElementById('m-block-val'),
        num: document.getElementById('m-num'),
        
        // 物理性质
        appearanceLabel: document.getElementById('appearance-label'),
        appearance: document.getElementById('m-appearance'),
        physicalPropsLabel: document.getElementById('physical-props-label'),
        atomicMassLabel: document.getElementById('atomic-mass-label'),
        atomicRadiusLabel: document.getElementById('atomic-radius-label'),
        densityLabel: document.getElementById('density-label'),
        meltingPointLabel: document.getElementById('melting-point-label'),
        boilingPointLabel: document.getElementById('boiling-point-label'),
        molarHeatLabel: document.getElementById('molar-heat-label'),
        mass: document.getElementById('m-mass'),
        radius: document.getElementById('m-radius'),
        density: document.getElementById('m-density'),
        melt: document.getElementById('m-melt'),
        boil: document.getElementById('m-boil'),
        molarHeat: document.getElementById('m-molar-heat'),
        
        // 化学性质
        chemicalPropsLabel: document.getElementById('chemical-props-label'),
        electronegativityLabel: document.getElementById('electronegativity-label'),
        electronAffinityLabel: document.getElementById('electron-affinity-label'),
        en: document.getElementById('m-en'),
        ea: document.getElementById('m-ea'),
        ionizationEnergiesLabel: document.getElementById('ionization-energies-label'),
        ionizationList: document.getElementById('m-ionization-list'),
        
        // 历史
        discoveryLabel: document.getElementById('discovery-label'),
        discoveredByLabel: document.getElementById('discovered-by-label'),
        namedByLabel: document.getElementById('named-by-label'),
        discoveredBy: document.getElementById('m-discovered-by'),
        namedBy: document.getElementById('m-named-by'),
        sourceLabel: document.getElementById('source-label'),
        source: document.getElementById('m-source'),
        sourceLinkText: document.getElementById('source-link-text'),
        
        // 媒体
        imageLabel: document.getElementById('image-label'),
        bohrImageLabel: document.getElementById('bohr-image-label'),
        loadImageText: document.getElementById('load-image-text'),
        loadBohrImageText: document.getElementById('load-bohr-image-text'),
        
        // 其他
        visualizerHint: document.getElementById('visualizer-hint')
    };
}

// === 状态变量 ===
let currentActiveCategory = null;
let currentTab = 'basic';
let rotX = 0;
let rotY = 0;
let isDragging = false;
let lastMouseX, lastMouseY;

// 放大视图状态
let expandedRotX = 0;
let expandedRotY = 0;
let expandedScale = 1;
let isExpandedDragging = false;
let expandedLastMouseX, expandedLastMouseY;
let currentElementZ = 1;
let currentElementData = null;

// 媒体加载状态 - 使用对象存储当前加载的URL，用于验证回调
let currentImageUrl = null;
let currentBohrImageUrl = null;

// 超时定时器
let imageTimeout = null;
let bohrImageTimeout = null;

// 超时时间（毫秒）
const LOAD_TIMEOUT = 5000;

// === 辅助函数 ===
function formatValue(val, fallback = '—') {
    if (val === null || val === undefined || val === 0 || val === '') {
        return fallback;
    }
    if (typeof val === 'number') {
        return Number.isInteger(val) ? val : val.toFixed(4).replace(/\.?0+$/, '');
    }
    return val;
}

// === 清除所有超时定时器 ===
function clearAllTimeouts() {
    if (imageTimeout) {
        clearTimeout(imageTimeout);
        imageTimeout = null;
    }
    if (bohrImageTimeout) {
        clearTimeout(bohrImageTimeout);
        bohrImageTimeout = null;
    }
}

// === 渲染图例 ===
function renderLegend() {
    legend.innerHTML = '';
    categories.forEach((c, i) => {
        const btn = document.createElement('div');
        btn.className = 'legend-item';
        btn.innerHTML = `<div class="legend-color" style="background:${c.color}"></div>${getCategoryName(c)}`;
        btn.onclick = () => toggleCategory(i, btn);
        legend.appendChild(btn);
    });
}

// === 渲染元素表格 ===
function renderTable() {
    table.innerHTML = '';

    elements.forEach((e, i) => {
        const [r, c] = getPos(e.idx);
        const el = document.createElement('div');
        el.className = 'element';
        el.style.gridRow = r;
        el.style.gridColumn = c;
        el.dataset.idx = e.idx;
        el.style.borderColor = e.cat.color;

        el.innerHTML = `
            <div class="atomic-number">${e.idx}</div>
            <div class="symbol" style="color:${e.cat.color}">${e.sym}</div>
            <div class="name">${getElementName(e)}</div>
            <div class="detail-val"></div>
        `;
        el.onclick = () => showModal(e);

        setTimeout(() => el.classList.add('visible'), i * 5);
        table.appendChild(el);
    });

    // 镧系/锕系占位符
    const placeholders = [
        { row: 6, col: 3, sym: "57-71", name: t('lanthanides'), catIdx: 8 },
        { row: 7, col: 3, sym: "89-103", name: t('actinides'), catIdx: 9 }
    ];

    placeholders.forEach(p => {
        const el = document.createElement('div');
        el.className = 'element placeholder';
        el.style.gridRow = p.row;
        el.style.gridColumn = p.col;

        const color = categories[p.catIdx].color;
        el.style.borderColor = color;

        el.innerHTML = `
            <div class="range-num" style="color:${color}">${p.sym}</div>
            <div class="name">${p.name}</div>
        `;

        el.onclick = () => {
            const btns = document.querySelectorAll('.legend-item');
            if (btns[p.catIdx]) btns[p.catIdx].click();
        };

        setTimeout(() => el.classList.add('visible'), 600);
        table.appendChild(el);
    });
}

// === 获取元素位置 ===
function getPos(n) {
    if (n == 1) return [1, 1];
    if (n == 2) return [1, 18];
    if (n >= 3 && n <= 4) return [2, n - 2];
    if (n >= 5 && n <= 10) return [2, n + 8];
    if (n >= 11 && n <= 12) return [3, n - 10];
    if (n >= 13 && n <= 18) return [3, n];
    if (n >= 19 && n <= 36) return [4, n - 18];
    if (n >= 37 && n <= 54) return [5, n - 36];
    if (n >= 55 && n <= 56) return [6, n - 54];
    if (n >= 72 && n <= 86) return [6, n - 68];
    if (n >= 87 && n <= 88) return [7, n - 86];
    if (n >= 104 && n <= 118) return [7, n - 100];
    if (n >= 57 && n <= 71) return [9, n - 53];
    if (n >= 89 && n <= 103) return [10, n - 85];
    return [0, 0];
}

// === 计算电子排布 ===
function getElectronData(Z) {
    let config = {};
    let remaining = Z;

    for (let orb of orbitals) {
        if (remaining <= 0) break;
        let type = orb.charAt(1);
        let cap = capacities[type];
        let fill = Math.min(remaining, cap);
        config[orb] = fill;
        remaining -= fill;
    }

    if (exceptions[Z]) {
        const patch = exceptions[Z];
        for (let orb in patch) {
            config[orb] = patch[orb];
        }
    }

    const sortOrb = (a, b) => {
        let n1 = parseInt(a[0]), n2 = parseInt(b[0]);
        if (n1 !== n2) return n1 - n2;
        const order = "spdf";
        return order.indexOf(a[1]) - order.indexOf(b[1]);
    };

    const configStr = Object.keys(config)
        .filter(k => config[k] > 0)
        .sort(sortOrb)
        .map(k => `${k}<sup>${config[k]}</sup>`)
        .join(' ');

    let shells = [];
    Object.keys(config).forEach(orb => {
        let n = parseInt(orb[0]);
        shells[n - 1] = (shells[n - 1] || 0) + config[orb];
    });

    for (let i = 0; i < shells.length; i++) {
        if (!shells[i]) shells[i] = 0;
    }

    return { str: configStr, shells: shells };
}

// === 初始化 ===
function init() {
    // 处理元素数据
    if (typeof elementsFullData !== 'undefined') {
        elements = processElementsData(elementsFullData);
    } else {
        console.error('elementsFullData not found!');
        return;
    }

    // 初始化模态框 DOM 元素缓存
    initModalElements();

    renderLegend();
    renderTable();
    initDragControl();
    initExpandedDragControl();
    initSearch();
    initKeyboard();
    updateUILanguage();
}

// === 分类切换 ===
function toggleCategory(catId, btn) {
    if (document.querySelector('.periodic-table.heatmap-active')) {
        setMode('default');
    }

    const allElements = document.querySelectorAll('.element');
    const allBtns = document.querySelectorAll('.legend-item');

    if (currentActiveCategory === catId) {
        currentActiveCategory = null;
        allBtns.forEach(b => b.classList.remove('active'));
        allElements.forEach(el => {
            el.style.opacity = '1';
            el.style.filter = 'none';
        });
    } else {
        currentActiveCategory = catId;
        allBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        allElements.forEach(el => {
            if (el.dataset.idx) {
                const data = elements[el.dataset.idx - 1];
                if (data.catId === catId) {
                    el.style.opacity = '1';
                    el.style.filter = 'none';
                } else {
                    el.style.opacity = '0.1';
                    el.style.filter = 'grayscale(100%)';
                }
            } else if (el.classList.contains('placeholder')) {
                const isRelated = (catId === 8 && el.querySelector('.name').innerText.includes('镧')) ||
                                  (catId === 9 && el.querySelector('.name').innerText.includes('锕')) ||
                                  (catId === 8 && el.querySelector('.name').innerText.includes('Lanthan')) ||
                                  (catId === 9 && el.querySelector('.name').innerText.includes('Actin'));
                el.style.opacity = isRelated ? '1' : '0.3';
            }
        });
    }
}

// === 模式切换 ===
function setMode(mode) {
    currentActiveCategory = null;
    document.querySelectorAll('.legend-item').forEach(b => b.classList.remove('active'));

    const domElements = document.querySelectorAll('.element');
    const btns = document.querySelectorAll('.mode-btn');

    btns.forEach(b => b.classList.remove('active'));
    document.querySelector(`button[onclick="setMode('${mode}')"]`)?.classList.add('active');

    if (mode === 'default') {
        table.classList.remove('heatmap-active');
        domElements.forEach(el => {
            if (el.classList.contains('placeholder')) {
                el.style.background = 'rgba(255,255,255,0.01)';
                el.style.opacity = '1';
                return;
            }
            const data = elements[el.dataset.idx - 1];
            el.style.background = 'var(--card-bg)';
            el.style.borderColor = data.cat.color;
            el.querySelector('.symbol').style.color = data.cat.color;
            el.style.opacity = '1';
            el.style.filter = 'none';
            el.querySelector('.detail-val').innerText = '';
        });
        return;
    }

    table.classList.add('heatmap-active');

    let maxVal = -Infinity, minVal = Infinity;
    elements.forEach(e => {
        let val = e[mode];
        if (val > 0) {
            if (val > maxVal) maxVal = val;
            if (val < minVal) minVal = val;
        }
    });

    domElements.forEach(el => {
        if (el.classList.contains('placeholder')) {
            el.style.opacity = '0.1';
            return;
        }

        const data = elements[el.dataset.idx - 1];
        const val = data[mode];
        const displayDiv = el.querySelector('.detail-val');

        el.style.opacity = '1';
        el.style.filter = 'none';

        if (!val || val === 0) {
            el.style.background = '#222';
            el.style.borderColor = '#444';
            displayDiv.innerText = '-';
        } else {
            let ratio = (val - minVal) / (maxVal - minVal);
            let hue = 240 - (ratio * 240);
            el.style.background = `hsla(${hue}, 70%, 40%, 0.8)`;
            el.style.borderColor = `hsla(${hue}, 100%, 70%, 1)`;
            el.querySelector('.symbol').style.color = '#fff';
            displayDiv.innerText = formatValue(val);
        }
    });
}

// === 设置语言 ===
function setLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('lang-zh').classList.toggle('active', lang === 'zh');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    updateUILanguage();
    renderTable();
    renderLegend();

    if (modal.classList.contains('open') && currentElementData) {
        showModal(currentElementData);
    }
    if (expandedAtomModal.classList.contains('open')) {
        updateExpandedAtomInfo();
    }
}

// === 更新UI语言 ===
function updateUILanguage() {
    updateElementTranslations({
        'main-title': 'periodic-table-title',
        'mode-standard': 'standard',
        'mode-radius': 'radius',
        'mode-electronegativity': 'electronegativity',
        'mode-ionization': 'ionization-energy',
        'mode-melting': 'melting-point',
        'mode-boiling': 'boiling-point',
        'mode-density': 'density',
        'rotate-hint': 'rotate-hint'
    });
    document.getElementById('searchInput').placeholder = t('search-placeholder');
}

// === 标签页切换 ===
function switchTab(tabId) {
    currentTab = tabId;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    document.getElementById(`tab-${tabId}`)?.classList.add('active');
    document.getElementById(`pane-${tabId}`)?.classList.add('active');
}

// === 显示弹窗 ===
function showModal(data) {
    currentElementZ = data.idx;
    currentElementData = data;
    rotX = 0;
    rotY = 0;
    atomContainer.style.transform = `rotateX(0deg) rotateY(0deg)`;

    // 清除之前的超时定时器
    clearAllTimeouts();

    // 重置媒体加载状态
    currentImageUrl = null;
    currentBohrImageUrl = null;
    resetMediaContainers();

    const m = modalElements; // 简化引用

    // 更新标签页按钮文字
    updateElementTranslations({
        'tab-basic': 'tab-basic',
        'tab-physical': 'tab-physical',
        'tab-chemical': 'tab-chemical',
        'tab-history': 'tab-history',
        'tab-media': 'tab-media'
    });

    // 头部信息
    m.symbol.innerText = data.sym;
    m.symbol.style.color = data.cat.color;
    m.name.innerText = getElementName(data);
    m.enName.innerText = currentLanguage === 'zh' ? data.enName : data.name;
    m.category.innerText = currentLanguage === 'zh' ? (data.category || getCategoryName(data.cat)) : (data.categoryEn || getCategoryName(data.cat));
    m.category.style.borderColor = data.cat.color;
    m.category.style.color = data.cat.color;
    m.phase.innerText = currentLanguage === 'zh' ? (data.phase || '—') : (data.phaseEn || '—');
    m.block.innerText = data.block ? data.block.toUpperCase() : '—';

    // 简介
    const summary = currentLanguage === 'zh' ? data.summary : data.summaryEn;
    m.summary.innerText = summary || t('no-data');
    m.summaryBox.style.display = summary ? 'block' : 'none';

    // === 基础信息标签页 ===
    m.electronConfigLabel.innerText = t('electron-configuration');
    
    // 电子排布 - 使用数据中的配置或计算
    const configDisplay = data.electronConfig || getElectronData(data.idx).str.replace(/<sup>/g, '').replace(/<\/sup>/g, '');
    m.config.innerHTML = configDisplay.replace(/(\d)([spdf])(\d+)/g, '$1$2<sup>$3</sup>');
    m.configSemantic.innerText = data.electronConfigSemantic || '';
    
    const shellsDisplay = data.shells.length > 0 ? data.shells : getElectronData(data.idx).shells;
    m.configShell.innerText = `${t('layers')}: ${shellsDisplay.join(' - ')}`;

    // 化合价
    m.valenceLabel.innerText = t('common-oxidation-states');
    m.valence.innerHTML = '';
    if (data.valence && data.valence.length > 0) {
        data.valence.forEach(v => {
            const tag = document.createElement('span');
            tag.className = 'valence-tag';
            tag.textContent = v;
            m.valence.appendChild(tag);
        });
    } else {
        m.valence.innerHTML = `<span class="no-data">${t('no-data')}</span>`;
    }

    // 同位素
    m.isotopesLabel.innerText = t('isotopes');
    m.isotopes.innerHTML = '';
    if (data.isotopes && data.isotopes.length > 0) {
        data.isotopes.forEach(iso => {
            const tag = document.createElement('span');
            tag.className = `isotope-tag ${iso.s ? 'isotope-stable' : ''}`;
            tag.innerHTML = `<span class="mass-num">${iso.m}</span>${data.sym}${iso.s ? ' ●' : ''}`;
            m.isotopes.appendChild(tag);
        });
    } else {
        m.isotopes.innerHTML = `<span class="no-data">${t('no-data')}</span>`;
    }

    // 位置信息
    updateElementTranslations({
        'position-label': 'position',
        'period-label': 'period',
        'group-label': 'group',
        'block-label': 'block',
        'atomic-num-label': 'atomic-number'
    });
    
    updateElementTexts({
        'm-period': formatValue(data.period),
        'm-group': formatValue(data.group),
        'm-block-val': data.block ? data.block.toUpperCase() : '—',
        'm-num': data.idx
    });

    // === 物理性质标签页 ===
    m.appearanceLabel.innerText = t('appearance');
    m.appearance.innerText = currentLanguage === 'zh' ? (data.appearance || t('no-data')) : (data.appearanceEn || t('no-data'));

    updateElementTranslations({
        'physical-props-label': 'physical-properties',
        'atomic-mass-label': 'atomic-mass',
        'atomic-radius-label': 'atomic-radius',
        'density-label': 'density-unit',
        'melting-point-label': 'melting-point-k',
        'boiling-point-label': 'boiling-point-k',
        'molar-heat-label': 'molar-heat'
    });

    updateElementTexts({
        'm-mass': formatValue(data.mass),
        'm-radius': formatValue(data.radius),
        'm-density': formatValue(data.density),
        'm-melt': formatValue(data.melt),
        'm-boil': formatValue(data.boil),
        'm-molar-heat': formatValue(data.molarHeat)
    });

    // === 化学性质标签页 ===
    updateElementTranslations({
        'chemical-props-label': 'chemical-properties',
        'electronegativity-label': 'electronegativity-pauling',
        'electron-affinity-label': 'electron-affinity'
    });
    
    updateElementTexts({
        'm-en': formatValue(data.en),
        'm-ea': formatValue(data.electronAffinity)
    });

    // 电离能列表
    m.ionizationEnergiesLabel.innerText = t('ionization-energies');
    m.ionizationList.innerHTML = '';
    if (data.ionizationEnergies && data.ionizationEnergies.length > 0) {
        data.ionizationEnergies.forEach((ie, idx) => {
            const item = document.createElement('div');
            item.className = 'ionization-item';
            let label = '';
            if (idx === 0) label = t('ionization-first');
            else if (idx === 1) label = t('ionization-second');
            else if (idx === 2) label = t('ionization-third');
            else label = t('ionization-nth').replace('{n}', idx + 1);
            item.innerHTML = `<span class="ion-label">${label}</span><span class="ion-value">${formatValue(ie)}</span>`;
            m.ionizationList.appendChild(item);
        });
    } else {
        m.ionizationList.innerHTML = `<span class="no-data">${t('no-data')}</span>`;
    }

    // === 历史标签页 ===
    updateElementTranslations({
        'discovery-label': 'discovery',
        'discovered-by-label': 'discovered-by',
        'named-by-label': 'named-by',
        'source-label': 'source'
    });
    
    m.discoveredBy.innerText = currentLanguage === 'zh' ? (data.discoveredBy || '—') : (data.discoveredByEn || '—');
    m.namedBy.innerText = currentLanguage === 'zh' ? (data.namedBy || '—') : (data.namedByEn || '—');

    const sourceUrl = currentLanguage === 'zh' ? data.source : data.sourceEn;
    if (sourceUrl) {
        m.source.href = sourceUrl;
        m.source.style.display = 'inline-flex';
    } else {
        m.source.style.display = 'none';
    }
    m.sourceLinkText.innerText = 'Wikipedia';

    // === 媒体标签页 ===
    updateElementTranslations({
        'image-label': 'element-image',
        'bohr-image-label': 'bohr-image',
        'load-image-text': 'load-image',
        'load-bohr-image-text': 'load-bohr-image'
    });

    // 检查资源可用性并更新按钮状态
    updateMediaButtonState('load-image-btn', 'load-image-text', data.image?.url, t('load-image'));
    updateMediaButtonState('load-bohr-image-btn', 'load-bohr-image-text', data.bohrModelImage, t('load-bohr-image'));

    m.visualizerHint.innerText = t('drag-rotate');

    render3DAtom(data.idx);
    switchTab('basic');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// === 重置媒体容器 ===
function resetMediaContainers() {
    // 重置实物图片
    const imageBtn = document.getElementById('load-image-btn');
    const img = document.getElementById('element-image');
    
    // 先清除事件处理器再重置
    img.onload = null;
    img.onerror = null;
    img.src = '';
    
    imageBtn.style.display = 'flex';
    imageBtn.classList.remove('loading', 'error', 'disabled');
    document.getElementById('image-display').style.display = 'none';
    
    // 重置玻尔模型图片
    const bohrBtn = document.getElementById('load-bohr-image-btn');
    const bohrImg = document.getElementById('bohr-image');
    
    bohrImg.onload = null;
    bohrImg.onerror = null;
    bohrImg.src = '';
    
    bohrBtn.style.display = 'flex';
    bohrBtn.classList.remove('loading', 'error', 'disabled');
    document.getElementById('bohr-image-display').style.display = 'none';
}

// === 更新媒体按钮状态 ===
function updateMediaButtonState(btnId, textId, resourceUrl, defaultText) {
    const btn = document.getElementById(btnId);
    const textSpan = document.getElementById(textId);
    if (!resourceUrl) {
        btn.classList.add('disabled');
        textSpan.innerText = t('no-resource');
    } else {
        btn.classList.remove('disabled');
        textSpan.innerText = defaultText;
    }
}

// === 设置按钮为失败状态 ===
function setButtonError(btn, textSpan, message) {
    btn.classList.remove('loading');
    btn.classList.add('error');
    textSpan.innerText = message;
}

// === 加载实物图片 ===
function loadElementImage() {
    const imageUrl = currentElementData?.image?.url;
    if (!imageUrl) return;

    const btn = document.getElementById('load-image-btn');
    const textSpan = document.getElementById('load-image-text');
    const display = document.getElementById('image-display');
    const img = document.getElementById('element-image');
    const caption = document.getElementById('image-caption');

    if (btn.classList.contains('disabled') || btn.classList.contains('loading')) return;

    // 如果是错误状态，允许重试
    btn.classList.remove('error');
    
    textSpan.innerText = t('loading');
    btn.classList.add('loading');
    
    // 记录当前加载的URL
    currentImageUrl = imageUrl;

    // 清除旧的超时
    if (imageTimeout) {
        clearTimeout(imageTimeout);
    }

    // 设置超时
    imageTimeout = setTimeout(() => {
        // 检查是否还是同一个加载请求
        if (currentImageUrl === imageUrl && btn.classList.contains('loading')) {
            img.onload = null;
            img.onerror = null;
            img.src = '';
            setButtonError(btn, textSpan, t('load-timeout'));
        }
    }, LOAD_TIMEOUT);

    img.onload = () => {
        // 检查是否还是同一个加载请求
        if (currentImageUrl !== imageUrl) return;
        
        clearTimeout(imageTimeout);
        imageTimeout = null;
        btn.style.display = 'none';
        display.style.display = 'block';
        caption.innerText = currentLanguage === 'zh' ? (currentElementData.image.title || '') : (currentElementData.image.title || '');
    };

    img.onerror = () => {
        // 检查是否还是同一个加载请求
        if (currentImageUrl !== imageUrl) return;
        
        clearTimeout(imageTimeout);
        imageTimeout = null;
        setButtonError(btn, textSpan, t('load-failed'));
    };

    img.src = imageUrl;
}

// === 加载玻尔模型图片 ===
function loadBohrImage() {
    const bohrUrl = currentElementData?.bohrModelImage;
    if (!bohrUrl) return;

    const btn = document.getElementById('load-bohr-image-btn');
    const textSpan = document.getElementById('load-bohr-image-text');
    const display = document.getElementById('bohr-image-display');
    const img = document.getElementById('bohr-image');

    if (btn.classList.contains('disabled') || btn.classList.contains('loading')) return;

    // 如果是错误状态，允许重试
    btn.classList.remove('error');
    
    textSpan.innerText = t('loading');
    btn.classList.add('loading');
    
    // 记录当前加载的URL
    currentBohrImageUrl = bohrUrl;

    // 清除旧的超时
    if (bohrImageTimeout) {
        clearTimeout(bohrImageTimeout);
    }

    // 设置超时
    bohrImageTimeout = setTimeout(() => {
        // 检查是否还是同一个加载请求
        if (currentBohrImageUrl === bohrUrl && btn.classList.contains('loading')) {
            img.onload = null;
            img.onerror = null;
            img.src = '';
            setButtonError(btn, textSpan, t('load-timeout'));
        }
    }, LOAD_TIMEOUT);

    img.onload = () => {
        // 检查是否还是同一个加载请求
        if (currentBohrImageUrl !== bohrUrl) return;
        
        clearTimeout(bohrImageTimeout);
        bohrImageTimeout = null;
        btn.style.display = 'none';
        display.style.display = 'block';
    };

    img.onerror = () => {
        // 检查是否还是同一个加载请求
        if (currentBohrImageUrl !== bohrUrl) return;
        
        clearTimeout(bohrImageTimeout);
        bohrImageTimeout = null;
        setButtonError(btn, textSpan, t('load-failed'));
    };

    img.src = bohrUrl;
}

// === 关闭弹窗 ===
function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    
    // 清除超时定时器
    clearAllTimeouts();
    
    // 清除当前加载状态
    currentImageUrl = null;
    currentBohrImageUrl = null;
    
    setTimeout(() => {
        atomContainer.innerHTML = '';
    }, 300);
}

// === 渲染3D原子模型 ===
function render3DAtom(Z, container = atomContainer, scale = 1) {
    container.innerHTML = '';

    const nucleus = document.createElement('div');
    nucleus.className = 'nucleus';
    if (scale !== 1) {
        nucleus.style.width = `${12 * scale}px`;
        nucleus.style.height = `${12 * scale}px`;
    }
    container.appendChild(nucleus);

    // 使用数据中的shells或计算
    const element = elements[Z - 1];
    const shells = element?.shells?.length > 0 ? element.shells : getElectronData(Z).shells;

    shells.forEach((count, idx) => {
        if (count === 0) return;
        const isValence = (idx === shells.length - 1);
        const baseSize = scale === 1 ? 40 : 80;
        const increment = scale === 1 ? 25 : 50;
        const size = baseSize + (idx * increment);

        const orbit = document.createElement('div');
        orbit.className = 'orbit-ring';
        orbit.style.width = `${size}px`;
        orbit.style.height = `${size}px`;
        orbit.style.top = `calc(50% - ${size / 2}px)`;
        orbit.style.left = `calc(50% - ${size / 2}px)`;

        const rx = Math.random() * 360, ry = Math.random() * 360;
        orbit.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

        const animDuration = 5 + idx * 2;
        orbit.animate([
            { transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(0deg)` },
            { transform: `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(360deg)` }
        ], {
            duration: animDuration * 1000,
            iterations: Infinity,
            easing: 'linear'
        });

        for (let i = 0; i < count; i++) {
            const electron = document.createElement('div');
            electron.className = `electron ${isValence ? 'valence' : 'inner'}`;
            if (scale !== 1) electron.classList.add('expanded');
            const angle = (360 / count) * i;
            electron.style.transform = `rotate(${angle}deg) translateX(${size / 2}px)`;
            orbit.appendChild(electron);
        }
        container.appendChild(orbit);
    });
    return shells;
}

// === 拖拽控制 ===
function initDragControl() {
    const wrapper = document.getElementById('atomWrapper');

    wrapper.addEventListener('mousedown', (e) => {
        if (e.target.closest('.expand-btn')) return;
        isDragging = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        rotY += dx * 0.5;
        rotX -= dy * 0.5;
        atomContainer.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => isDragging = false);

    wrapper.addEventListener('touchstart', (e) => {
        if (e.target.closest('.expand-btn')) return;
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const dx = e.touches[0].clientX - lastMouseX;
        const dy = e.touches[0].clientY - lastMouseY;
        rotY += dx * 0.8;
        rotX -= dy * 0.8;
        atomContainer.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => isDragging = false);
}

// === 放大视图拖拽控制 ===
function initExpandedDragControl() {
    const wrapper = document.getElementById('expandedAtomWrapper');

    wrapper.addEventListener('mousedown', (e) => {
        isExpandedDragging = true;
        expandedLastMouseX = e.clientX;
        expandedLastMouseY = e.clientY;
        wrapper.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isExpandedDragging) return;
        const dx = e.clientX - expandedLastMouseX;
        const dy = e.clientY - expandedLastMouseY;
        expandedRotY += dx * 0.5;
        expandedRotX -= dy * 0.5;
        expandedAtomContainer.style.transform = `rotateX(${expandedRotX}deg) rotateY(${expandedRotY}deg) scale(${expandedScale})`;
        expandedLastMouseX = e.clientX;
        expandedLastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
        isExpandedDragging = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        expandedScale = Math.max(0.5, Math.min(2, expandedScale + delta));
        expandedAtomContainer.style.transform = `rotateX(${expandedRotX}deg) rotateY(${expandedRotY}deg) scale(${expandedScale})`;
    }, { passive: false });

    wrapper.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isExpandedDragging = true;
            expandedLastMouseX = e.touches[0].clientX;
            expandedLastMouseY = e.touches[0].clientY;
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isExpandedDragging || !expandedAtomModal.classList.contains('open')) return;
        const dx = e.touches[0].clientX - expandedLastMouseX;
        const dy = e.touches[0].clientY - expandedLastMouseY;
        expandedRotY += dx * 0.8;
        expandedRotX -= dy * 0.8;
        expandedAtomContainer.style.transform = `rotateX(${expandedRotX}deg) rotateY(${expandedRotY}deg) scale(${expandedScale})`;
        expandedLastMouseX = e.touches[0].clientX;
        expandedLastMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => isExpandedDragging = false);
}

// === 打开放大原子视图 ===
function openExpandedAtom() {
    expandedRotX = 0;
    expandedRotY = 0;
    expandedScale = 1;
    expandedAtomContainer.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;

    render3DAtom(currentElementZ, expandedAtomContainer, 1.8);
    updateExpandedAtomInfo();
    expandedAtomModal.classList.add('open');
}

// === 更新放大视图信息 ===
function updateExpandedAtomInfo() {
    const element = elements[currentElementZ - 1];
    document.getElementById('expanded-symbol').innerText = element.sym;
    document.getElementById('expanded-symbol').style.color = element.cat.color;
    document.getElementById('expanded-name').innerText = `${element.name} ${element.enName}`;
    document.getElementById('expanded-hint').innerText = t('expanded-hint');

    const shells = element?.shells?.length > 0 ? element.shells : getElectronData(currentElementZ).shells;
    const legendContainer = document.getElementById('expanded-shell-legend');
    legendContainer.innerHTML = '';

    shells.forEach((count, idx) => {
        if (count === 0) return;
        const isValence = (idx === shells.length - 1);
        const item = document.createElement('div');
        item.className = `shell-legend-item ${isValence ? 'valence' : ''}`;
        
        const shellName = currentLanguage === 'zh' 
            ? `${t('shell-prefix')}${idx + 1}${t('shell-suffix')}`
            : `${t('shell-prefix')}${idx + 1}`;
        
        const valenceText = isValence ? ` ${t('valence-shell')}` : '';
        
        item.innerHTML = `
            <span class="shell-dot ${isValence ? 'valence' : 'inner'}"></span>
            <span>${shellName}: ${count}${t('electrons-unit')}${valenceText}</span>
        `;
        legendContainer.appendChild(item);
    });
}

// === 关闭放大原子视图 ===
function closeExpandedAtom() {
    expandedAtomModal.classList.remove('open');
    setTimeout(() => expandedAtomContainer.innerHTML = '', 300);
}

// === 搜索功能 ===
function initSearch() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();

        document.querySelectorAll('.element').forEach(el => {
            let match = false;

            if (el.classList.contains('placeholder')) {
                match = el.innerText.toLowerCase().includes(val);
            } else if (el.dataset.idx) {
                const d = elements[el.dataset.idx - 1];
                match = d.name.includes(val) ||
                    d.sym.toLowerCase().includes(val) ||
                    String(d.idx) === val ||
                    d.enName.toLowerCase().includes(val);
            }

            if (val === '') {
                el.style.opacity = '1';
                el.style.filter = 'none';
            } else {
                el.style.opacity = match ? '1' : '0.1';
                el.style.filter = match ? 'none' : 'grayscale(100%)';
            }
        });
    });
}

// === 键盘事件 ===
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (expandedAtomModal.classList.contains('open')) {
                closeExpandedAtom();
            } else {
                closeModal();
            }
        }
    });
}

// === 弹窗点击背景关闭 ===
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

expandedAtomModal.addEventListener('click', (e) => {
    if (e.target === expandedAtomModal) closeExpandedAtom();
});

// === 启动应用 ===
init();
