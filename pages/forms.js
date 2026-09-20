import Layout from '@/components/Layout';
import TestForm from '@/components/TestForm';

export default function FormsPage() {
  return (
    <Layout title="Формы">
      <div className="page-head">
        <span className="kicker">// Формы подачи</span>
        <h1>Форма <em>«Тест»</em></h1>
        <p>Заполните поля ниже — заявка моментально уйдёт в Discord департамента.</p>
      </div>

      <TestForm />
    </Layout>
  );
}
