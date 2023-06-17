import { extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
    colors: {
        palette: {
            1: '#3f1438',
            2: '#722670',
            3: '#270a1c',
            4: '#581e53',
            5: '#6d6168',
            6: '#FFE1E1',
            blue: '#058BC0',
            blue2: '#2C5288',
            yellow: '#F2AE30',
            yellow2: '#F9E4CB'
        },
        crimson: {
            1: '#fffcfd',
            2: '#fff7fb',
            3: '#feeff6',
            4: '#fce5f0',
            5: '#f9d8e7',
            6: '#f4c6db',
            7: '#edadc8',
            8: '#e58fb1',
            9: '#e93d82',
            10: '#e03177',
            11: '#d31e66',
            12: '#3d0d1d'
        },
        plum: {
            1: '#fefcff',
            2: '#fff8ff',
            3: '#fceffc',
            4: '#f9e5f9',
            5: '#f3d9f4',
            6: '#ebc8ed',
            7: '#dfafe3',
            8: '#cf91d8',
            9: '#ab4aba',
            10: '#a43cb4',
            11: '#9c2bad',
            12: '#340c3b'
        },
        purple: {
            1: '#fefcfe',
            2: '#fdfaff',
            3: '#f9f1fe',
            4: '#f3e7fc',
            5: '#eddbf9',
            6: '#e3ccf4',
            7: '#d3b4ed',
            8: '#be93e4',
            9: '#8e4ec6',
            10: '#8445bc',
            11: '#793aaf',
            12: '#2b0e44'
        },
        yellow: {
            1: '#fdfdf9',
            2: '#fffce8',
            3: '#fffbd1',
            4: '#fff8bb',
            5: '#fef2a4',
            6: '#f9e68c',
            7: '#efd36c',
            8: '#ebbc00',
            9: '#f5d90a',
            10: '#f7ce00',
            11: '#946800',
            12: '#35290f'
        },
        gold: {
            1: '#fdfdfc',
            2: '#fbf9f2',
            3: '#f5f2e9',
            4: '#eeeadd',
            5: '#e5dfd0',
            6: '#dad1bd',
            7: '#cbbda4',
            8: '#b8a383',
            9: '#978365',
            10: '#8c795d',
            11: '#776750',
            12: '#3b352b'
        },
        bronze: {
            1: '#fdfcfc',
            2: '#fdf8f6',
            3: '#f8f1ee',
            4: '#f2e8e4',
            5: '#eaddd7',
            6: '#e0cec7',
            7: '#d1b9b0',
            8: '#bfa094',
            9: '#a18072',
            10: '#977669',
            11: '#846358',
            12: '#43302b'
        },
        indigo: {
            1: '#fdfdfe',
            2: '#f8faff',
            3: '#f0f4ff',
            4: '#e6edfe',
            5: '#d9e2fc',
            6: '#c6d4f9',
            7: '#aec0f5',
            8: '#8da4ef',
            9: '#3e63dd',
            10: '#3a5ccc',
            11: '#3451b2',
            12: '#101d46'
        },
        teal: {
            1: '#fafefd',
            2: '#f1fcfa',
            3: '#e7f9f5',
            4: '#d9f3ee',
            5: '#c7ebe5',
            6: '#afdfd7',
            7: '#8dcec3',
            8: '#53b9ab',
            9: '#12a594',
            10: '#0e9888',
            11: '#067a6f',
            12: '#10302b'
        },
        grass: {
            1: '#fbfefb',
            2: '#f3fcf3',
            3: '#ebf9eb',
            4: '#dff3df',
            5: '#ceebcf',
            6: '#b7dfba',
            7: '#97cf9c',
            8: '#65ba75',
            9: '#46a758',
            10: '#3d9a50',
            11: '#297c3b',
            12: '#1b311e'
        },
        sky: {
            1: '#f9feff',
            2: '#f1fcff',
            3: '#e4f9ff',
            4: '#d5f4fd',
            5: '#c1ecf9',
            6: '#a4dff1',
            7: '#79cfea',
            8: '#2ebde5',
            9: '#68ddfd',
            10: '#5fd4f4',
            11: '#0078a1',
            12: '#003242'
        },
        cyan: {
            1: '#fafdfe',
            2: '#f2fcfd',
            3: '#e7f9fb',
            4: '#d8f3f6',
            5: '#c4eaef',
            6: '#aadee6',
            7: '#84cdda',
            8: '#3db9cf',
            9: '#05a2c2',
            10: '#0894b3',
            11: '#0c7792',
            12: '#04313c'
        }
    },
    fonts: {
        heading: 'Poppins',
        body: 'Poppins'
    },
    fontSizes: {
        fs: '0.65rem'
    },
    components: {
        Select: {
            sizes: {
                md: { field: { paddingInlineEnd: null, px: 1 } },
                sm: { field: { paddingInlineEnd: null, px: 1 } },
                xs: { field: { paddingInlineEnd: null, px: 1 } }
            }
        },
        FormControl: {
            baseStyle: {
                zIndex: -1
            }
        }
    },
    styles: {
        global: {
            body: {
                bg: '#f8faff',
                color: 'gray.700'
            }
        }
    }
})