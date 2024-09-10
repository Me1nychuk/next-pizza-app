import { InfoBlock } from "@/shared/components/shared";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Доступ заборонено"
        text="Дану сторінку можуть переглядати тільки авторизовані користувачі."
        imageUrl="/assets/images/lock.png"
      />
    </div>
  );
}
