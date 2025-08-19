document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carrito-detallado-container');
    const totalCompraElement = document.getElementById('total-compra');
    
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>Tu carrito está vacío. <a href="index.html">Volver a la tienda</a>.</p>';
        totalCompraElement.textContent = 'Total: $0.00';
        return;
    }

    let total = 0;
    
    const tabla = document.createElement('table');
    tabla.style.width = '100%';
    tabla.style.borderCollapse = 'collapse';
    tabla.innerHTML = `
        <thead>
            <tr>
                <th style="text-align: left; padding: 10px; border-bottom: 2px solid #ddd;">Producto</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid #ddd;">Cantidad</th>
                <th style="text-align: right; padding: 10px; border-bottom: 2px solid #ddd;">Precio Unitario</th>
                <th style="text-align: right; padding: 10px; border-bottom: 2px solid #ddd;">Subtotal</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    const tbody = tabla.querySelector('tbody');

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td style="padding: 15px 10px; border-bottom: 1px solid #eee;">
                <div style="display: flex; align-items: center;">
                    <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 15px; border-radius: 4px;">
                    <span>${item.nombre}</span>
                </div>
            </td>
            <td style="text-align: center; padding: 10px; border-bottom: 1px solid #eee;">${item.cantidad}</td>
            <td style="text-align: right; padding: 10px; border-bottom: 1px solid #eee;">$${item.precio.toFixed(2)}</td>
            <td style="text-align: right; padding: 10px; border-bottom: 1px solid #eee;"><b>$${subtotal.toFixed(2)}</b></td>
        `;
        tbody.appendChild(fila);
    });

    carritoContainer.appendChild(tabla);
    totalCompraElement.textContent = `Total: $${total.toFixed(2)}`;
});