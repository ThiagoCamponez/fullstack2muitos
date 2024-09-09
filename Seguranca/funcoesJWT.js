import jwt from 'jsonwebtoken';

export function assinar(usuario) {
    const token = jwt.sign({ usuario }, process.env.CHAVE_SECRETA, {
        expiresIn: '18000s'
    });
    return token;
}

export function verificarAssinatura(token) {
    try {
        return jwt.verify(token, process.env.CHAVE_SECRETA);
    } catch (erro) {
        console.error('Erro ao verificar token:', erro);
        return undefined;
    }
}
