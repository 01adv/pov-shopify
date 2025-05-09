export const colorHexMap: Record<string, string> = {
    "Tango Red": "#D13438",
    "Iris Black": "#1A1A1A",
    "Jute Black": "#2F2F2F",
    "Misty Blue": "#AFCBFF",
    "Forest Green": "#228B22",
    "Cacao Brown": "#5C3A21",
    "Ceramic Beige": "#E7D8C9",
    "Pink": "#FFC0CB",
    "Plum": "#8E4585",
    "Tweed Pink": "#D8A0A6",
    "Winter White": "#F5F5F5",
    "Barely Pink": "#FFE4E1",
    "Deep Plum": "#580F41",
    "Navy Blue": "#000080",
    "Houndstooth Blue": "#3C5A99",
    "White and Black": "#D3D3D3", // approximation
    "Wine": "#722F37",
    "Powder Blue": "#B0E0E6",
    "Green-Grey": "#A9A9A9",
    "Black-Grey": "#2E2E2E",
    "Spectra Yellow": "#FCF75E",
    "Baby Pink": "#F4C2C2",
    "Blue and White": "#B0C4DE",
    "Dusty Pink": "#DCAE96",
    "White": "#FFFFFF",
    "Black": "#000000",
};

export const getHexCode = (color: string): string | null => {
    return colorHexMap[color] || null;
};
