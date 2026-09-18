import { describe, expect, it } from 'vitest'
import { applyMask, applyPattern, maskMaxLength, unmask } from './masks'

describe('applyMask', () => {
  it('formata cpf conforme digita', () => {
    expect(applyMask('123', 'cpf')).toBe('123')
    expect(applyMask('1234', 'cpf')).toBe('123.4')
    expect(applyMask('12345678901', 'cpf')).toBe('123.456.789-01')
    expect(applyMask('123456789012345', 'cpf')).toBe('123.456.789-01')
  })

  it('formata cnpj', () => {
    expect(applyMask('12345678000199', 'cnpj')).toBe('12.345.678/0001-99')
  })

  it('formata telefone fixo e celular', () => {
    expect(applyMask('1133334444', 'phone')).toBe('(11) 3333-4444')
    expect(applyMask('11933334444', 'phone')).toBe('(11) 93333-4444')
    expect(applyMask('(11) 9', 'phone')).toBe('(11) 9')
  })

  it('formata cep, data e hora', () => {
    expect(applyMask('01310100', 'cep')).toBe('01310-100')
    expect(applyMask('17092026', 'date')).toBe('17/09/2026')
    expect(applyMask('0930', 'time')).toBe('09:30')
  })

  it('formata dinheiro em real pela direita', () => {
    expect(applyMask('1', 'currency')).toBe('R$ 0,01')
    expect(applyMask('123456', 'currency')).toBe('R$ 1.234,56')
    expect(applyMask('', 'currency')).toBe('')
  })

  it('mantem um separador decimal em numero', () => {
    expect(applyMask('1.234,56', 'number')).toBe('1.23456')
    expect(applyMask('-12,5', 'number')).toBe('-12,5')
    expect(applyMask('abc', 'number')).toBe('')
  })

  it('aceita padrao customizado e funcao', () => {
    expect(applyMask('ABC1234', 'AAA-9999')).toBe('ABC-1234')
    expect(applyMask('abc', (value) => value.toUpperCase())).toBe('ABC')
  })

  it('ignora caractere que nao casa com o token', () => {
    expect(applyPattern('12a34', '99-99')).toBe('12-34')
  })
})

describe('unmask', () => {
  it('devolve so os digitos de mascaras numericas', () => {
    expect(unmask('123.456.789-01', 'cpf')).toBe('12345678901')
    expect(unmask('(11) 93333-4444', 'phone')).toBe('11933334444')
  })

  it('devolve valor decimal para dinheiro', () => {
    expect(unmask('R$ 1.234,56', 'currency')).toBe('1234.56')
  })
})

describe('maskMaxLength', () => {
  it('devolve o tamanho do padrao', () => {
    expect(maskMaxLength('cpf')).toBe(14)
    expect(maskMaxLength('phone')).toBe(15)
    expect(maskMaxLength('currency')).toBeUndefined()
  })
})
