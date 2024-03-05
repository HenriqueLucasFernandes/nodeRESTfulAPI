const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const NodeCache = require('node-cache');

const app = express();
const port = 3000;
const cache = new NodeCache();

app.use(bodyParser.json());
app.use(morgan('dev'));

let produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
};

// Middleware para gerenciar o cache
const cacheMiddleware = (req, res, next) => {
    const cacheKey = req.originalUrl || req.url;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        console.log('Cache hit:', cacheKey);
        return res.json(cachedData);
    } else {
        console.log('Cache miss:', cacheKey);
        res.sendResponse = res.json;
        res.json = (body) => {
            cache.set(cacheKey, body);
            res.sendResponse(body);
        };
        next();
    }
};

// GET para obter todos os produtos
app.get('/produtos', cacheMiddleware, (req, res) => {
    res.json(produtos);
});

//GET para obter um produto por ID
app.get('/produtos/:id', cacheMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.produtos.find(p => p.id === id);
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

//POST para adicionar um novo produto
app.post('/produtos', (req, res) => {
    const novoProduto = req.body;
    produtos.produtos.push(novoProduto);
    res.status(201).json(novoProduto);
    // Limpar o cache após adicionar um novo produto
    cache.flushAll();
});

//PUT para atualizar um produto existente
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        produtos.produtos[index] = req.body;
        res.json(produtos.produtos[index]);
        // Limpar o cache após atualizar um produto
        cache.flushAll();
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

// DELETE para excluir um produto
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    produtos.produtos = produtos.produtos.filter(p => p.id !== id);
    res.status(204).send();
    // Limpar o cache após excluir um produto
    cache.flushAll();
});

//Function para iniciar o servidor
app.listen(port, () => {
    console.log(`O Servidor está rodando na porta ${port}`);
});
