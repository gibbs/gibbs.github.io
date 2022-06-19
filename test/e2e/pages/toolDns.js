module.exports = {
  url: process.env.APP_URL + 'tools/dns',
  elements: {
    result: {
      selector: '.result'
    },
    inputName: {
      selector: 'input[name=name]'
    },
    selectNameserver: {
      selector: 'select[name=nameserver]'
    },
    buttonSubmit: {
      selector: '#mkpasswd_generate'
    },
    checkboxTypeA: {
      selector: '#type_a'
    },
    checkboxTypeAAAA: {
      selector: '#type_aaaa'
    },
    checkboxTypeANY: {
      selector: '#type_any'
    },
    checkboxTypeCAA: {
      selector: '#type_caa'
    },
    checkboxTypeCNAME: {
      selector: '#type_cname'
    },
    checkboxTypeDNSKEY: {
      selector: '#type_dnskey'
    },
    checkboxTypeDS: {
      selector: '#type_ds'
    },
    checkboxTypeMX: {
      selector: '#type_mx'
    },
    checkboxTypeNS: {
      selector: '#type_ns'
    },
    checkboxTypePTR: {
      selector: '#type_ptr'
    },
    checkboxTypeSOA: {
      selector: '#type_soa'
    },
    checkboxTypeSRV: {
      selector: '#type_srv'
    },
    checkboxTypeTLSA: {
      selector: '#type_tlsa'
    },
    checkboxTypeTSIG: {
      selector: '#type_tsig'
    },
    checkboxTypeTXT: {
      selector: '#type_txt'
    }
  }
}
