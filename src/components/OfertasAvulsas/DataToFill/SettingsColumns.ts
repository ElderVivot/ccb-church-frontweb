import { ColumnSettings } from 'handsontable/settings'

export const SettingsColumns: ColumnSettings[] = [
    {
        data: 'dateMovement',
        title: '<b>Data</b>',
        type: 'text',
        filter: true,
        width: 90
    }, {
        data: 'amount',
        title: '<b>Valor</b>',
        type: 'numeric',
        filter: true,
        numericFormat: {
            pattern: '0.00',
            culture: 'pt-BR'
        },
        width: 100
    }, {
        data: 'bank',
        title: '<b>Banco</b>',
        type: 'text',
        filter: true,
        width: 110
    }, {
        data: 'receivedFrom',
        title: '<b>Recebido De</b>',
        type: 'text',
        filter: true,
        width: 300
    }, {
        data: 'descriptionProof',
        title: '<b>Descrição no PIX</b>',
        type: 'text',
        filter: true,
        width: 200
    }, {
        data: 'idCentroCusto',
        title: '<b>Centro de Custo</b>',
        type: 'dropdown',
        filter: true,
        width: 200,
        source: ['yellow', 'red', 'orange', 'green', 'blue', 'gray', 'black', 'white']
    }, {
        data: 'comments',
        title: '<b>Observações</b>',
        type: 'text',
        filter: true,
        width: 400
    }
]