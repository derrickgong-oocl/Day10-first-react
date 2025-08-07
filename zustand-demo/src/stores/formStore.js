import { create } from 'zustand';

// 步骤1: 基本信息
const initialStep1Data = {
  name: '',
  email: '',
  phone: '',
  age: ''
};

// 步骤2: 地址信息
const initialStep2Data = {
  country: '',
  province: '',
  city: '',
  address: '',
  zipCode: ''
};

// 步骤3: 偏好设置
const initialStep3Data = {
  theme: 'light',
  notifications: false,
  newsletter: false,
  language: 'zh-CN'
};

export const useFormStore = create((set, get) => ({
  // 当前步骤
  currentStep: 1,
  
  // 各步骤数据
  step1Data: initialStep1Data,
  step2Data: initialStep2Data,
  step3Data: initialStep3Data,
  
  // 各步骤验证状态
  step1Valid: false,
  step2Valid: false,
  step3Valid: false,
  
  // 各步骤loading状态
  step1Loading: false,
  step2Loading: false,
  step3Loading: false,
  
  // 整体提交loading
  submitting: false,
  
  // 更新步骤数据
  updateStep1Data: (data) => set((state) => ({
    step1Data: { ...state.step1Data, ...data }
  })),
  
  updateStep2Data: (data) => set((state) => ({
    step2Data: { ...state.step2Data, ...data }
  })),
  
  updateStep3Data: (data) => set((state) => ({
    step3Data: { ...state.step3Data, ...data }
  })),
  
  // 更新验证状态
  updateStep1Valid: (valid) => set({ step1Valid: valid }),
  updateStep2Valid: (valid) => set({ step2Valid: valid }),
  updateStep3Valid: (valid) => set({ step3Valid: valid }),
  
  // 更新loading状态
  updateStep1Loading: (loading) => set({ step1Loading: loading }),
  updateStep2Loading: (loading) => set({ step2Loading: loading }),
  updateStep3Loading: (loading) => set({ step3Loading: loading }),
  
  // 切换步骤
  setCurrentStep: (step) => set({ currentStep: step }),
  
  // 下一步
  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 3) {
      set({ currentStep: currentStep + 1 });
    }
  },
  
  // 上一步
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },
  
  // 检查步骤是否可跳转
  canGoToStep: (step) => {
    const state = get();
    if (step === 1) return true;
    if (step === 2) return state.step1Valid;
    if (step === 3) return state.step1Valid && state.step2Valid;
    return false;
  },
  
  // 获取步骤状态
  getStepStatus: (step) => {
    const state = get();
    if (step < state.currentStep) return 'completed';
    if (step === state.currentStep) return 'current';
    return 'pending';
  },
  
  // 提交表单
  submitForm: () => {
    const { step1Data, step2Data, step3Data } = get();
    const formData = {
      ...step1Data,
      ...step2Data,
      ...step3Data
    };
    
    console.log('提交的表单数据:', formData);
    
    // 重置表单
    set({
      step1Data: initialStep1Data,
      step2Data: initialStep2Data,
      step3Data: initialStep3Data,
      step1Valid: false,
      step2Valid: false,
      step3Valid: false,
      currentStep: 1,
      submitting: false
    });
    
    alert('表单提交成功！');
  },
  
  // 重置表单
  resetForm: () => set({
    step1Data: initialStep1Data,
    step2Data: initialStep2Data,
    step3Data: initialStep3Data,
    step1Valid: false,
    step2Valid: false,
    step3Valid: false,
    currentStep: 1,
    step1Loading: false,
    step2Loading: false,
    step3Loading: false,
    submitting: false
  })
}));
