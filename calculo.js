// 1. Selecione os elementos da tela primeiro
let b = document.getElementById("btn_total");

// 2. Crie o evento de clique
b.addEventListener('click', function () {
    
    // --- VALIDAÇÃO COM JANELINHA NATIVA E BORDA VERMELHA ---
    const camposObrigatorios = document.querySelectorAll('#quantidade_total input[required]');
    let primeiroCampoInvalido = null;

    camposObrigatorios.forEach(input => {
        if (input.value.trim() === "") {
            input.style.borderColor = "red"; // Aplica a borda vermelha
            
            // Guarda o primeiro campo vazio encontrado para focarmos nele depois
            if (!primeiroCampoInvalido) {
                primeiroCampoInvalido = input;
            }
        } else {
            input.style.borderColor = ""; // Reseta a borda se estiver preenchido
        }
    });

    // Se houver algum campo inválido...
    if (primeiroCampoInvalido) {
        // Dispara a janelinha nativa de aviso do navegador apontando para o campo
        primeiroCampoInvalido.reportValidity(); 
        return; // Interrompe o código e não abre o modal
    }
    // -----------------------------------------------------

    // 3. Pegue os valores ATUAIS dentro do clique
    let poteRecebido = Number(document.getElementById("pote_rec").value) || 0;
    let tampaRecebidaP = Number(document.getElementById("tampa_p_rec").value) || 0;
    let tampaRecebidaB = Number(document.getElementById("tampa_b_rec").value) || 0;
    let dosadorRecebido = Number(document.getElementById("dosador_rec").value) || 0;
    let silicaRecebida = Number(document.getElementById("silica_rec").value) || 0;
    let rotuloRecebido = Number(document.getElementById("rotulo_rec").value) || 0;
    let contador = Number(document.getElementById("contador").value) || 0;
    let qntSilica = Number(document.getElementById("qnt_silicas").value) || 0;

    let potePerda = Number(document.getElementById("pote_perda").value) || 0;
    let tampaPerdaP = Number(document.getElementById("tampa_p_perda").value) || 0;
    let tampaPerdaB = Number(document.getElementById("tampa_b_perda").value) || 0;
    let dosadorPerda = Number(document.getElementById("dosador_perda").value) || 0;
    let silicaPerda = Number(document.getElementById("silica_perda").value) || 0;

    let total = Number(document.getElementById("total").value) || 0;

    // Fórmulas de Devolução e Perda
    let perdaRotulo = contador - total;
    let devolRotulo = rotuloRecebido - contador - perdaRotulo;
    let devolucaoPote = Math.max(0, poteRecebido - potePerda - total);
    let devolucaoTampaP = Math.max(0, tampaRecebidaP - tampaPerdaP - total);
    let devolucaoTampaB = Math.max(0, tampaRecebidaB - tampaPerdaB - total);
    let devolucaoDosador = Math.max(0, dosadorRecebido - dosadorPerda - total);
    let devolucaoSilica = Math.max(0, silicaRecebida - silicaPerda - (qntSilica * total));

    // 4. Monta o relatório HTML
    const relatorioHTML = `
        <h3>DEVOLUÇÃO DE MP/ME</h3>
        <p><strong>Pote:</strong> ${devolucaoPote}</p>
        <p><strong>Tampa P:</strong> ${devolucaoTampaP}</p>
        <p><strong>Tampa B:</strong> ${devolucaoTampaB}</p>
        <p><strong>Dosador:</strong> ${devolucaoDosador}</p>
        <p><strong>Sílica:</strong> ${devolucaoSilica}</p>
        <p><strong>Devol. Rótulo:</strong> ${devolRotulo}</p>
        <p><strong>Perda Rótulo:</strong> ${perdaRotulo}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
        <p style="font-size: 18px; color: #0056B3;"><strong>TOTAL OP (Digitado):</strong> ${total}</p>
    `;

    // 5. Injeta o texto na div interna do modal
    document.getElementById('conteudo-relatorio').innerHTML = relatorioHTML;

    // 6. Faz o modal aparecer na tela
    const modal = document.getElementById('modal-resultado');
    modal.style.display = 'block';

    // LÓGICA PARA FECHAR O MODAL
    document.getElementById('btn-fechar-modal').onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});