// === 国际化模块 ===

let currentLanguage = 'zh';

const translations = {
    zh: {
        'periodic-table-title': '元素周期表',
        'standard': '标准',
        'radius': '半径',
        'electronegativity': '电负性',
        'ionization-energy': '电离能',
        'melting-point': '熔点',
        'boiling-point': '沸点',
        'density': '密度',
        'search-placeholder': '查找元素...',
        'rotate-hint': '💡 横屏查看效果更佳',
        'drag-rotate': '拖拽旋转视角',
        'expanded-hint': '拖拽旋转 · 滚轮缩放',
        'tab-basic': '基础',
        'tab-physical': '物理',
        'tab-chemical': '化学',
        'tab-history': '历史',
        'tab-media': '媒体',
        'electron-configuration': '电子排布',
        'common-oxidation-states': '常见化合价',
        'isotopes': '同位素 (● 稳定)',
        'position': '周期表位置',
        'period': '周期',
        'group': '族',
        'block': '区块',
        'atomic-number': '原子序数',
        'appearance': '外观',
        'physical-properties': '物理性质',
        'atomic-mass': '相对原子质量',
        'atomic-radius': '原子半径 (pm)',
        'density-unit': '密度 (g/cm³)',
        'melting-point-k': '熔点 (K)',
        'boiling-point-k': '沸点 (K)',
        'molar-heat': '摩尔热容 (J/mol·K)',
        'chemical-properties': '化学性质',
        'electronegativity-pauling': '电负性 (鲍林)',
        'electron-affinity': '电子亲和能 (kJ/mol)',
        'ionization-energies': '电离能 (kJ/mol)',
        'ionization-first': '第1电离能',
        'ionization-second': '第2电离能',
        'ionization-third': '第3电离能',
        'ionization-nth': '第{n}电离能',
        'discovery': '发现',
        'discovered-by': '发现者',
        'named-by': '命名者',
        'source': '参考资料',
        'element-image': '实物图片',
        'bohr-image': '玻尔模型图',
        'load-image': '加载实物图片',
        'load-bohr-image': '加载玻尔模型图',
        'loading': '加载中...',
        'load-failed': '加载失败，点击重试',
        'load-timeout': '加载超时，点击重试',
        'no-resource': '暂无资源',
        'layers': '电子层',
        'no-data': '暂无数据',
        'shell-prefix': '第',
        'shell-suffix': '层',
        'electrons-unit': '个电子',
        'valence-shell': '(价电子层)',
        'lanthanides': '镧系',
        'actinides': '锕系',
        'alkali-metal': '碱金属',
        'alkaline-earth-metal': '碱土金属',
        'transition-metal': '过渡金属',
        'post-transition-metal': '后过渡金属',
        'metalloid': '类金属',
        'nonmetal': '非金属',
        'halogen': '卤素',
        'noble-gas': '稀有气体',
        'lanthanide': '镧系',
        'actinide': '锕系'
    },
    en: {
        'periodic-table-title': 'Periodic Table',
        'standard': 'Standard',
        'radius': 'Radius',
        'electronegativity': 'Electronegativity',
        'ionization-energy': 'Ionization',
        'melting-point': 'Melting Pt',
        'boiling-point': 'Boiling Pt',
        'density': 'Density',
        'search-placeholder': 'Search elements...',
        'rotate-hint': '💡 Better view in landscape',
        'drag-rotate': 'Drag to rotate',
        'expanded-hint': 'Drag to rotate · Scroll to zoom',
        'tab-basic': 'Basic',
        'tab-physical': 'Physical',
        'tab-chemical': 'Chemical',
        'tab-history': 'History',
        'tab-media': 'Media',
        'electron-configuration': 'Electron Configuration',
        'common-oxidation-states': 'Common Oxidation States',
        'isotopes': 'Isotopes (● Stable)',
        'position': 'Position in Table',
        'period': 'Period',
        'group': 'Group',
        'block': 'Block',
        'atomic-number': 'Atomic Number',
        'appearance': 'Appearance',
        'physical-properties': 'Physical Properties',
        'atomic-mass': 'Atomic Mass',
        'atomic-radius': 'Atomic Radius (pm)',
        'density-unit': 'Density (g/cm³)',
        'melting-point-k': 'Melting Point (K)',
        'boiling-point-k': 'Boiling Point (K)',
        'molar-heat': 'Molar Heat (J/mol·K)',
        'chemical-properties': 'Chemical Properties',
        'electronegativity-pauling': 'Electronegativity (Pauling)',
        'electron-affinity': 'Electron Affinity (kJ/mol)',
        'ionization-energies': 'Ionization Energies (kJ/mol)',
        'ionization-first': '1st Ionization',
        'ionization-second': '2nd Ionization',
        'ionization-third': '3rd Ionization',
        'ionization-nth': '{n}th Ionization',
        'discovery': 'Discovery',
        'discovered-by': 'Discovered by',
        'named-by': 'Named by',
        'source': 'Reference',
        'element-image': 'Element Image',
        'bohr-image': 'Bohr Model Image',
        'load-image': 'Load Image',
        'load-bohr-image': 'Load Bohr Model',
        'loading': 'Loading...',
        'load-failed': 'Failed, click to retry',
        'load-timeout': 'Timeout, click to retry',
        'no-resource': 'No Resource',
        'layers': 'Shells',
        'no-data': 'No data',
        'shell-prefix': 'Shell ',
        'shell-suffix': '',
        'electrons-unit': ' electrons',
        'valence-shell': '(Valence)',
        'lanthanides': 'Lanthanides',
        'actinides': 'Actinides',
        'alkali-metal': 'Alkali Metal',
        'alkaline-earth-metal': 'Alkaline Earth',
        'transition-metal': 'Transition Metal',
        'post-transition-metal': 'Post-transition',
        'metalloid': 'Metalloid',
        'nonmetal': 'Nonmetal',
        'halogen': 'Halogen',
        'noble-gas': 'Noble Gas',
        'lanthanide': 'Lanthanide',
        'actinide': 'Actinide'
    }
};

function t(key) {
    return translations[currentLanguage][key] || key;
}

function getElementName(element) {
    return currentLanguage === 'zh' ? element.name : element.enName;
}

function getCategoryName(category) {
    return currentLanguage === 'zh' ? category.name : category.nameEn;
}

// === 批量更新 DOM 元素的翻译文本 ===
function updateElementTranslations(mappings) {
    Object.entries(mappings).forEach(([id, key]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = t(key);
    });
}

// === 批量更新 DOM 元素的文本内容 ===
function updateElementTexts(mappings) {
    Object.entries(mappings).forEach(([id, text]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    });
}
