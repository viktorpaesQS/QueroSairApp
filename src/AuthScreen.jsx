import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const AuthScreen = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({ title: "⚠️ Erro", description: "Por favor, preencha e-mail e senha.", variant: "destructive" });
      return;
    }
    if (!isLogin && !formData.name) {
      toast({ title: "⚠️ Erro", description: "Por favor, preencha seu nome.", variant: "destructive" });
      return;
    }
    const userData = { id: Date.now(), name: formData.name || formData.email.split('@')[0], email: formData.email };
    onLogin(userData);
  };

  return (
    <div className="min-h-screen w-full bg-brand-black flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-dark-gray rounded-full mb-4 border-2 border-light-gray">
            <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg yellow-glow">
              <Car className="w-9 h-9 text-brand-black" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-brand-yellow tracking-wider">QUERO SAIR</h1>
          <p className="text-text-secondary text-sm mt-1">Sua comunicação de trânsito.</p>
        </div>

        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, x: isLogin ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
                <Input
                    id="name"
                    name="name"
                    type="text"
                    label="Seu nome"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            )}
            <Input
                id="email"
                name="email"
                type="email"
                label="E-mail"
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            <div className="relative">
                <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    label="Senha"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-brand-yellow transition-colors"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full h-12 text-base font-bold bg-brand-yellow text-brand-black hover:bg-yellow-400 yellow-glow">
                    {isLogin ? 'Entrar' : 'Criar Conta'}
                </Button>
            </motion.div>
          </form>
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-text-secondary text-sm">
            {isLogin ? 'Não tem uma conta?' : 'Já possui uma conta?'}
            <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-brand-yellow hover:text-yellow-300 ml-1 transition-colors">
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthScreen;