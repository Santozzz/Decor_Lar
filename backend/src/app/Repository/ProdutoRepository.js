import supabase from '../database/supabaseClient.js';

export async function getAllProdutos() {
  // Get de todos os produtos
  const { data, error } = await supabase
    .from('Produtos') 
    .select('*');

  if (error) throw new Error(error.message);
  return data;
}