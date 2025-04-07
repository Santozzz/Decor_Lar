import supabase from '../database/supabaseClient.js';

export async function getAllProdutos() {
  // Get de todos os produtos
  const { data, error } = await supabase
    .from('Produtos') 
    .select('*');

  if (error) throw new Error(error.message);
  return data;
}

export async function addProduto(produto) {
  const { data, error } = await supabase
    .from('Produtos')
    .insert([produto])
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateProduto(id, produto) {
  const { data, error } = await supabase
    .from('Produtos')
    .update(produto)
    .eq('id', id)
    .select(); 

  if (error) throw new Error(error.message);
  return data;
}


export async function deleteProduto(id) {
  const { data, error } = await supabase
    .from('Produtos')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return data;
}