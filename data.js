// === 元素分类数据 ===
const categories = [
    { name: "碱金属", nameEn: "Alkali Metal", color: "#ff5252" }, 
    { name: "碱土金属", nameEn: "Alkaline Earth Metal", color: "#ffb142" },
    { name: "过渡金属", nameEn: "Transition Metal", color: "#706fd3" }, 
    { name: "后过渡金属", nameEn: "Post-transition Metal", color: "#33d9b2" },
    { name: "类金属", nameEn: "Metalloid", color: "#34ace0" }, 
    { name: "非金属", nameEn: "Nonmetal", color: "#ffda79" },
    { name: "卤素", nameEn: "Halogen", color: "#218c74" }, 
    { name: "稀有气体", nameEn: "Noble Gas", color: "#b33939" },
    { name: "镧系", nameEn: "Lanthanide", color: "#f78fb3" }, 
    { name: "锕系", nameEn: "Actinide", color: "#cd84f1" }
];

// === 分类名称映射 ===
const categoryNameMap = {
    "碱金属": 0,
    "碱土金属": 1,
    "过渡金属": 2,
    "后过渡金属": 3,
    "类金属": 4,
    "非金属": 5,
    "卤素": 6,
    "稀有气体": 7,
    "镧系": 8,
    "锕系": 9
};

// === 电子排布配置数据 ===
const orbitals = ['1s','2s','2p','3s','3p','4s','3d','4p','5s','4d','5p','6s','4f','5d','6p','7s','5f','6d','7p'];
const capacities = {s:2, p:6, d:10, f:14};

// === 特殊电子排布例外 ===
const exceptions = {
    24: {'4s':1, '3d':5}, 
    29: {'4s':1, '3d':10},
    41: {'5s':1, '4d':4}, 
    42: {'5s':1, '4d':5},
    44: {'5s':1, '4d':7}, 
    45: {'5s':1, '4d':8},
    46: {'5s':0, '4d':10}, 
    47: {'5s':1, '4d':10},
    78: {'6s':1, '5d':9}, 
    79: {'6s':1, '5d':10}
};

// === 处理元素数据函数 ===
function processElementsData(rawData) {
    return rawData.elements.map(e => {
        const catId = categoryNameMap[e.category_ui_name] ?? 5;
        return {
            // 基础信息
            idx: e.number,
            sym: e.symbol,
            name: e.name,
            enName: e.name_en,
            mass: e.atomic_mass,
            cat: categories[catId],
            catId: catId,
            colorHex: e.color_hex || categories[catId].color,
            
            // 位置信息
            period: e.period,
            group: e.group,
            block: e.block,
            xpos: e.xpos,
            ypos: e.ypos,
            
            // 物理属性
            radius: e.radius || 0,
            density: e.density || 0,
            melt: e.melt || 0,
            boil: e.boil || 0,
            molarHeat: e.molar_heat || 0,
            phase: e.phase,
            phaseEn: e.phase_en,
            appearance: e.appearance,
            appearanceEn: e.appearance_en,
            
            // 化学属性
            en: e.electronegativity_pauling || 0,
            electronAffinity: e.electron_affinity || 0,
            ip: e.ionization_energies?.[0] || 0,
            ionizationEnergies: e.ionization_energies || [],
            valence: e.valence || [],
            
            // 电子排布
            shells: e.shells || [],
            electronConfig: e.electron_configuration || '',
            electronConfigSemantic: e.electron_configuration_semantic || '',
            
            // 同位素
            isotopes: e.isotopes || [],
            
            // 分类详情
            category: e.category,
            categoryEn: e.category_en,
            
            // 发现信息
            discoveredBy: e.discovered_by,
            discoveredByEn: e.discovered_by_en,
            namedBy: e.named_by,
            namedByEn: e.named_by_en,
            
            // 简介
            summary: e.summary,
            summaryEn: e.summary_en,
            
            // 外部资源
            source: e.source,
            sourceEn: e.source_en,
            bohrModelImage: e.bohr_model_image, // 玻尔模型图片
            bohrModel3d: e.bohr_model_3d,       // 3D模型
            image: e.image,
            cpkHex: e['cpk-hex']
        };
    });
}

// === 元素数组（将在初始化时填充）===
let elements = [];
